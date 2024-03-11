<?php
/**
 * Search API: WP_UNICAT_SEARCH
 * 
 * @package Insolvenz_Monitor-Core
 * @subpackage Insolvenz_Monitor
 */

/**
 * Create search results for custom queries
 */
class WP_Unicat_Search {

    private $query;
    private $packets;

    public function __construct(string $query = Null) {

        $this->query = urldecode($query);
        if ($query) $this->storeSearch();

        $this->packets = [
            'Basic' => [
                'searchLimit' => 5,
                'watchlistLimit' => 5
            ],
            'Standard' => [
                'searchLimit' => 20,
                'watchlistLimit' => 20
            ],
            'Premium' => [
                'searchLimit' => 'unlimited',
                'watchlistLimit' => 'unlimited'
            ],
        ];
    }

    public function availablePackets() {
        return $this->packets;
    }

    public function getCurrentPacket() {
        global $wpdb;

        $result = $wpdb->get_row(
            'SELECT * 
            FROM `'.$wpdb->prefix.'record_order` 
            WHERE `user_id` = '.get_current_user_id()
        );

        return $result;
    }

    public function search() {
        global $wpdb;

        $query = (string)esc_sql($this->query);
        $debtor=explode("dataid",$query);
        $debtor=$debtor[0];


        $results = $wpdb->get_results('
            SELECT `Id`, `NameOfDebtor`, `LocalCourt`, `FileNumber`, `FullTextOfTheNotice`, `DateOfNotice` 
            FROM `PublishedRecords` 
            WHERE `NameOfDebtor` = "'.$debtor.'"
            ORDER BY `DateOfNotice` ASC;
        ');

        return $results;
    }

    public function searchCount() {
        global $wpdb;

        $packet = $this->getCurrentPacket();

        if ($this->packets[$packet->packet]['searchLimit'] === 'unlimited') {
            return 1;
        }

        $results = $wpdb->get_row(
            'SELECT COUNT(*) as count 
            FROM `'.$wpdb->prefix.'search_log` 
            WHERE `user_id` = '.get_current_user_id().'
                && DATE(`created_at`) = "'.\date('Y-m-d').'"'
        );
       
         return $results && (int)$this->packets[$packet->packet]['searchLimit'] > (int)$results->count ? $this->packets[$packet->packet]['searchLimit'] - (int)$results->count : 0;
    }

    public function storeSearch() {
        global $wpdb;

        if ($this->inWatchlist($this->query)) return;
      
        if ($this->inSearchlog($this->query)) return;

        $insert = $wpdb->insert(
            $wpdb->prefix.'search_log',
            [
                "user_id" => get_current_user_id(),
                "search" => $this->query
            ]
        );
    }


    public function inSearchlog($query) {
        global $wpdb;

        $query = (string)esc_sql($this->query);
        $result = $wpdb->get_row(
            'SELECT COUNT(*) as count 
            FROM `'.$wpdb->prefix.'search_log` 
            WHERE `user_id` = '.get_current_user_id().'
             && `search` = "'.$query.'"'
        );  

        return $result && $result->count ? true : false;
    }

    public function inWatchlist($query) {
        global $wpdb;

        $query = (string)esc_sql($this->query);
        $data_id=explode("dataid",$query);
        $data_id=$data_id[1];

        $result = $wpdb->get_row(
            'SELECT COUNT(*) as count 
            FROM `'.$wpdb->prefix.'records_watchlist` 
            WHERE `user_id` = '.get_current_user_id().'
             && `data_id` = "'.$data_id.'"'
        );  

        return $result && $result->count ? true : false;
    }

    public function watchlist() {
        global $wpdb;
      
        // $results = $wpdb->get_results('SELECT *, COUNT(*) as `notices` FROM  `'.$wpdb->prefix.'records_watchlist` WHERE `user_id` = '.get_current_user_id().';');
        // return $results;

        $results = $wpdb->get_results('SELECT * FROM  `'.$wpdb->prefix.'records_watchlist` WHERE `user_id` = '.get_current_user_id().';');
        return $results;
    }

    public function watchlistCount() {
        global $wpdb;

        $packet = $this->getCurrentPacket();

        if ($this->packets[$packet->packet]['watchlistLimit'] === 'unlimited') {
            return 1;
        }

        $results = $wpdb->get_row(
            'SELECT COUNT(*) as count 
            FROM `'.$wpdb->prefix.'records_watchlist` 
            WHERE `user_id` = '.get_current_user_id().'
             AND  DATE(`created_at`) = "'.\date('Y-m-d').'"'
        );
        if($results)
        {
          if((int)$this->packets[$packet->packet]['watchlistLimit'] > (int)$results->count)
          {
             return (int)$this->packets[$packet->packet]['watchlistLimit'] - (int)$results->count;
          }
          else
          {
              return 0;
          }
        
        }
        else
        {
            return 0;
        }
//        return $results && (int)$this->packets[$packet->packet]['watchlistLimit'] > (int)$results->count ? $this->packets[$packet->packet]['watchlistLimit'] - (int)$results->count : 0;
    }
}
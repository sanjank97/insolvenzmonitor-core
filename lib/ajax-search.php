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
class WP_Unicat_Ajax_Search {

    public function __construct() {
        add_action('rest_api_init', [ $this, 'api_register' ]);

        // ADD TO WATCHLIST
        add_action( 'wp_ajax_add_watchlist', [ $this, 'add_watchlist'] );
        add_action( 'wp_ajax_nopriv_add_watchlist', [ $this, 'add_watchlist'] );

        // DELETE FROM WATCHLIST
        add_action( 'wp_ajax_del_watchlist', [ $this, 'del_watchlist'] );
        add_action( 'wp_ajax_nopriv_del_watchlist', [ $this, 'del_watchlist'] );

        // Delete vai compnay name
        add_action( 'wp_ajax_del_watchlistbyValue', [ $this, 'del_watchlistbyValue'] );
        add_action( 'wp_ajax_nopriv_del_watchlistbyValue', [ $this, 'del_watchlistbyValue'] );

        //Check watch list
        
        add_action( 'wp_ajax_comp_checkWatchlist', [ $this, 'comp_checkWatchlist'] );
        add_action( 'wp_ajax_nopriv_comp_checkWatchlist', [ $this, 'comp_checkWatchlist'] );
    }

   /**
     * Define rest api route for wordpress
     *
     * @return void
     */
    public function api_register() : Void {
        register_rest_route('insolvenz-monitor/v1', '/search', [
            'methods' => 'GET',
            'callback' => [ $this, 'search' ],
            'permission_callback' => '__return_true'
        ]);
        register_rest_route('insolvenz-monitor/v1', '/description', [
            'methods' => 'GET',
            'callback' => [ $this, 'description' ],
            'permission_callback' => '__return_true'
        ]);
    }

    public function description(Object $request) {
        global $wpdb;

        $params = wp_parse_args($request->get_params(), [
            'id' => null
        ]);

        $id = (int)esc_sql($params['id']);

        $result = $wpdb->get_row(
            'SELECT `FullTextOfTheNotice` 
            FROM `PublishedRecords` 
            WHERE `Id` = ' . $id
        );

        return new WP_REST_Response($result, 200);
    }

    public function search(Object $request) {
        global $wpdb;
        $params = wp_parse_args($request->get_params(), [
            'search' => null,
            'another'=>null,
            'page' => 1
        ]);         
        $page = (int)esc_sql($params['page']);
        $offset = 0;
         
        if ($page > 1) {
            $offset = (int)esc_sql($params['page']) * 10;
        }
        
        $query = (string)esc_sql($params['search']);
     
        $results = $wpdb->get_results(
            'SELECT *, COUNT(*) as `notices`
            FROM `PublishedRecords` 
            WHERE `FileNumber` LIKE "%'.$query.'%" OR
                `LocalCourt` LIKE "%'.$query.'%" OR
                `NameOfDebtor` LIKE "%'.$query.'%" OR
                `Residence` LIKE "%'.$query.'%" OR
                `CommercialRegisterNumber` LIKE "%'.$query.'%" OR
                `FullTextOfTheNotice` LIKE "%'.$query.'%" 
            GROUP BY `NameOfDebtor`
            ORDER BY `NameOfDebtor` ASC
            LIMIT 500
            OFFSET '.$offset.';'
        );

        // $results = $wpdb->get_results(
        //     'SELECT `NameOfDebtor`, `Residence`, `DateOfNotice`, COUNT(*) as `notices`
        //     FROM `PublishedRecords` 
        //     WHERE `FileNumber` LIKE "%'.$query.'%" OR
        //         `LocalCourt` LIKE "%'.$query.'%" OR
        //         `NameOfDebtor` LIKE "%'.$query.'%" OR
        //         `Residence` LIKE "%'.$query.'%" OR
        //         `CommercialRegisterNumber` LIKE "%'.$query.'%" OR
        //         `FullHeadline` LIKE "%'.$query.'%" OR
        //         `FullTextOfTheNotice` LIKE "%'.$query.'%"
        //     GROUP BY `NameOfDebtor`
        //     ORDER BY `NameOfDebtor` ASC
        //     LIMIT 500
        //     OFFSET '.$offset.';'
        // );

        return new WP_REST_RESPONSE($results, 200);
    }

    public function add_watchlist () {
        global $wpdb;

        $name = (string)urldecode(esc_sql($_POST['name']));
        $data_id =$_POST['data_id'];

        if (!$this->checkWatchlist($data_id)) {
            $inserted = $this->insertWatchlist($name,$data_id);

        } else {
            $response = [
                    'status' => 'watching',
                    'code' => 200
                ];
                echo json_encode($response);
             wp_die();
        }
        
        if ($inserted) {
            $response = [
                    'status' => 'stored',
                    'code' => 200
                ];
                echo json_encode($response);
        } else {
            $response = [
                    'status' => 'error',
                    'code' => 400
                ];
                echo json_encode($response);
        }


        wp_die();
    }

    public function del_watchlist() {
        global $wpdb;

        try {
            $id = (int)esc_sql($_POST['id']);

            $delete = $wpdb->delete($wpdb->prefix . 'records_watchlist', [ 'user_id' => get_current_user_id(), 'id' => $id ]);

            echo json_encode([
                'status' => 'deleted',
                'code' => 200
            ]);
        } catch (Exception $e) {
            echo json_encode([
                'status' => 'error',
                'code' => 400
            ]);
        }

        wp_die();
    }

    public function del_watchlistbyValue() {
        global $wpdb;

        try {
            $name = (string)urldecode(esc_sql($_POST['name']));
            $data_id=$_POST['data_id'];
            $delete = $wpdb->delete($wpdb->prefix . 'records_watchlist', [ 'user_id' => get_current_user_id(), 'data_id' => $data_id]);

            echo json_encode([
                'status' => 'deleted',
                'code' => 200
            ]);
        } catch (Exception $e) {
            echo json_encode([
                'status' => 'error',
                'code' => 400
            ]);
        }

        wp_die();
    }
    public function comp_checkWatchlist()
    {
        global $wpdb;
        try {
        $response = $wpdb->get_results('
                    SELECT `data_id` 
                    FROM `'.$wpdb->prefix.'records_watchlist` 
                    WHERE `user_id` = '.get_current_user_id().'; 
                    ');
            echo json_encode([
                'data'=>$response,
                'status' => 'deleted',
                'code' => 200
            ]);
        } catch (Exception $e) {
            echo json_encode([
                'status' => 'error',
                'code' => 400
            ]);
        }   
        wp_die();      
    }

    private function insertWatchlist($name ,$data_id) {
        global $wpdb;
        $debtor = $this->getDebtor($data_id);

        $data = [
            'user_id' => get_current_user_id(),
            'NameOfDebtor' => $name,
            'Notices' => $this->getDebtorNotices($name)??0
        ];
       

        if ($debtor) {
            $data = [
                'user_id' => get_current_user_id(),
                'data_id' => $debtor->Id,
                'NameOfDebtor' => $debtor->NameOfDebtor,
                'Residence' => $debtor->LocalCourt??'',//here store localcourt in residence column
                'DateOfNotice' => $debtor->DateOfNotice??'',
                'Notices' => $this->getDebtorNotices($name)??0

            ];
        }

        $insert = $wpdb->insert(
            $wpdb->prefix.'records_watchlist',
            $data
        );

     return $wpdb->insert_id;
   
        
    }

    private function getDebtor($data_id) {
        global $wpdb;

        $debtor = $wpdb->get_row('
                SELECT `Id`,`NameOfDebtor`, `LocalCourt`, `DateOfNotice` 
                FROM `PublishedRecords` 
                WHERE `Id` = "'.$data_id.'"
                ORDER BY `DateOfNotice` DESC; 
            ');

        return $debtor;
    }

    private function getDebtorNotices ($name) {
        global $wpdb;

        $debtor = $wpdb->get_row('
                SELECT COUNT(*) as count 
                FROM `PublishedRecords` 
                WHERE `NameOfDebtor` LIKE "%'.$name.'%"
                GROUP BY `NameOfDebtor`; 
            ');

        return $debtor ? $debtor->count : 0;
    }


    private function checkWatchlist($data_id) {
        global $wpdb;

        $check = $wpdb->get_row('
                    SELECT `id` 
                    FROM `'.$wpdb->prefix.'records_watchlist` 
                    WHERE `user_id` = '.get_current_user_id().' 
                        && `data_id` = "'.$data_id.'"; 
                    ');

        return $check ? 1 : 0;
    }

}
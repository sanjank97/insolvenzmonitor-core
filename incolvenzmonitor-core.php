<?php
/**

 * @package Insolvenz Monitor Core

 */
 
/*

Plugin Name: Insolvenz Monitor Core
Plugin URI: https://github.com/orlanrepo/insolvenzmonitore-core
Description: Custom Insolvenz Monitor integration with Theme
Version: 1.0.0
Author: Unicat
Author URI: https://unicat.tech/
License: GPLv2 or later
Text Domain: insolvenzmonitor-core

*/

if (! defined('ABSPATH')) {
    exit;
}

if (! defined('UNICAT_ASSETS')) {
    define('UNICAT_ASSETS', site_url().'/wp-content/plugins/insolvenzmonitor-core/assets/');
}

if (! defined('UNICAT_INCLUDES')) {
    define('UNICAT_INCLUDES', dirname(__FILE__) . '/includes/');
}

if (! defined('UNICAT_LIB')) {
    define('UNICAT_LIB', dirname(__FILE__) . '/lib/');
}

if (! defined('UNICAT_TEMPLATE_PATH')) {
    define('UNICAT_TEMPLATE_PATH', dirname(__FILE__) . '/templates/');
}


/**
 * Define core class for insolvenzmonitor plugin
 */
class WP_UNICAT {

    public function __construct() {
        // Register plugin hooks
        register_activation_hook(__FILE__, [ $this, 'install' ]);
        register_deactivation_hook(__FILE__, [ $this, 'uninstall' ]);

        // Enqueue scripts
        add_action('wp_enqueue_scripts', [ $this, 'attach_scripts' ]);

        add_action('woocommerce_checkout_update_order_meta', [ $this, 'attach_user_packet' ]);

        add_action('woocommerce_created_customer', [ $this, 'add_registered_packet'], 10 , 3);


        // API Ajax Init
        $this->api_init();
    }

    public function attach_user_packet($order_id) {
        global $wpdb;

        
        $order  = wc_get_order($order_id);
        $product = current($order->get_items());

        //die(var_dump('Testing'));

        $insert = $wpdb->insert(
            $wpdb->prefix.'record_order',
            [
                "user_id" => get_current_user_id(),
                "order_id" => $order_id,
                "packet" => $product['name'],
                "from_date" => \date('Y-m-d'),
                "till_date" => \date('Y-m-d', strtotime('+1 month'))
            ]
        );
    }

    public function add_registered_packet( $customer_id, $new_customer_data, $password_generated) {
        global $wpdb;

        $insert = $wpdb->insert(
            $wpdb->prefix.'record_order',
            [
                "user_id" => $customer_id,
                "order_id" => 0,
                "packet" => 'Basic',
                "from_date" => \date('Y-m-d'),
                "till_date" => \date('Y-m-d', strtotime('+1 month'))
            ]
        );
    }

    public function attach_scripts() {
        global $query_string;

        wp_enqueue_script('mvt_sweatalert', 'https://cdn.jsdelivr.net/npm/sweetalert2@11.7.0/dist/sweetalert2.all.min.js', '', rand(), true); //'1.0.0' 
        
        wp_enqueue_script('unicat_script', UNICAT_ASSETS . 'js/insolvenzmonitor-core.js', '', rand(), true); //'1.0.0'

        if (is_front_page() || preg_match('/(suche|watchlist|new-home)/', $_SERVER['REQUEST_URI'])) {
            wp_localize_script(
                'unicat_script', 
                'homepage_search', 
                [
                    'template' => get_template_directory_uri(),
                    'user_id' => get_current_user_id()
                ]);
            return;
        }

        if (preg_match("/s=/i", $query_string)) {
            wp_localize_script('unicat_script', 'main_search', []);
            // wp_localize_script('unicat_script', 'main_search', [
            //     'ajax_url' => admin_url('admin-ajax.php'),
            //     'query' => str_replace('s=', '', $query_string)
            // ]);
        }

        return;
    }

    private function api_init(): void {
        if (!class_exists('WP_Unicat_Ajax_Search')) {
            require_once UNICAT_LIB . 'ajax-search.php';
        }
        if (!class_exists('WP_Unicat_Watchlist')) {
            require_once UNICAT_LIB . 'watchlist.php';
        }

        $api = new WP_Unicat_Ajax_Search();
        $wathclist = new WP_Unicat_Watchlist();
    }

    public function install() {
        global $wpdb;

        // $wpdb->query('
        //     CREATE TABLE IF NOT EXISTS '.$wpdb->prefix.'published_records (
        //         id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        //         DateOfNotice DATE,
        //         FileNumber VARCHAR(25),
        //         LocalCourt VARCHAR(25),
        //         NameOfDebtor VARCHAR(50),
        //         Residence VARCHAR(50),
        //         CommercialRegisterNumber VARCHAR(50) NULL,
        //         FullHeadline VARCHAR(150) NULL,
        //         FullTextOfTheNotice TEXT NULL,
        //         WebsiteVersion VARCHAR(10),
        //         CreatedOn DATETIME
        //     ) ENGINE = INNODB;
        // ');

        $wpdb->query('
                CREATE TABLE IF NOT EXISTS `'.$wpdb->prefix.'records_watchlist` (
                    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                    `data_id` INT NOT NULL,
                    `user_id` INT NOT NULL,
                    `NameOfDebtor` VARCHAR(550),
                    `Residence` VARCHAR(550),
                    `DateOfNotice` DATE,
                    `Notices` INT,
                    `created_at` TIMESTAMP NOT NULL
                ) ENGINE = INNODB;
        ');

        $wpdb->query('
                    CREATE TABLE IF NOT EXISTS `'.$wpdb->prefix.'record_order` (
                        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                        user_id INT NOT NULL,
                        order_id INT,
                        packet VARCHAR(50) NOT NULL,
                        from_date DATE,
                        till_date DATE
                    ) ENGINE = INNODB;
        ');

        $wpdb->query('
                    CREATE TABLE IF NOT EXISTS `'.$wpdb->prefix.'search_log` (
                        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                        user_id INT NOT NULL,
                        search VARCHAR(550) NOT NULL,
                        created_at TIMESTAMP NOT NULL
                    ) ENGINE = INNODB;
        ');
    }

    public function uninstall() {
        global $wpdb;

         //do n't remove comment
        // $wpdb->query('DROP TABLE `'.$wpdb->prefix.'published_records`;'); 
        $wpdb->query('DROP TABLE `'.$wpdb->prefix.'records_watchlist`;');
        $wpdb->query('DROP TABLE `'.$wpdb->prefix.'record_order`;');
        $wpdb->query('DROP TABLE `'.$wpdb->prefix.'search_log`;');
    }

}

new WP_UNICAT();
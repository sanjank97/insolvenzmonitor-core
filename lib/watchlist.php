<?php
/**
 * Watchlist API: WP_UNICAT_WATCHLIST
 * 
 * @package Insolvenz_Monitor-Core
 * @subpackage Insolvenz_Monitor
 */

class WP_Unicat_Watchlist {

    private $settings;

    public function __construct() {
        add_action('rest_api_init', [ $this, 'api_register' ]);

        $this->settings = [
            'from_email' => get_option('mailserver_login')
        ];
    }

    /**
     * Define rest api route for wordpress
     *
     * @return void
     */
    public function api_register() : Void {
        register_rest_route('insolvenz-monitor/v1', '/watchlist', [
            'methods' => 'GET',
            'callback' => [ $this, 'watchlist' ],
            'permission_callback' => '__return_true'
        ]);
    }

    public function watchlist() {
        ob_clean();
        global $wpdb;

        $results = $wpdb->get_results('SELECT * FROM  `'.$wpdb->prefix.'records_watchlist`;');

        if ($results) {
            foreach ($results as $result) {
                $user = get_userdata($result->user_id);
                if($this->check_diff($result)) {
                    $this->configure_send_mail($user->user_email, $result);
                    $this->delete_watch($result->id);
                }
            }
        }
    }

    private function check_diff($watchlist) {
        ob_clean();
        global $wpdb;

        if ($watchlist->Notices > 0) {
            $query_result = $wpdb->get_row('
                SELECT COUNT(*) as `notices`
                FROM  `PublishedRecords` 
                WHERE `NameOfDebtor` = "'.$watchlist->NameOfDebtor.'" 
                    && `Residence` = "'.$watchlist->Residence.'";
            ');
        } else {
            $query = $watchlist->NameOfDebtor;
            $query_result = $wpdb->get_row(
                'SELECT COUNT(*) as `notices`
                FROM `PublishedRecords` 
                WHERE `FileNumber` LIKE "%'.$query.'%" OR
                    `LocalCourt` LIKE "%'.$query.'%" OR
                    `NameOfDebtor` LIKE "%'.$query.'%" OR
                    `Residence` LIKE "%'.$query.'%" OR
                    `CommercialRegisterNumber` LIKE "%'.$query.'%" OR
                    `FullHeadline` LIKE "%'.$query.'%" OR
                    `FullTextOfTheNotice` LIKE "%'.$query.'%";
                '
            );
        }
        return $query_result ? $query_result->notices > $watchlist->Notices : 0;
    }

    private function configure_send_mail ($user_email, $watchlist) {
        $subject = 'Insolvenzmonitor.info - found an update in your company';
        $html = '<p style="margin: 0 0 16px;">Guten Tag,,</p>
                <p style="margin: 0 0 16px;">Ein Unternehmen, das auf Ihrer Beobachtungsliste stand, hat ein Update.</p>
                <p style="margin: 0 0 16px;">
                    <ul>
                        <li>
                            Company: <a href="https://insolvenzmonitor.archie.tools/search/'.$watchlist->NameOfDebtor.'">'.$watchlist->NameOfDebtor.'</a>
                        </li>
                    </ul>
                </p>
                <p>Vielen Dank für die Nutzung von Insolvenzmonitor,,
                <br/>
                Ihr <a href="https://insolvenzmonitor.info">Insolvenzmonitor</a> Team
                </p>';

        $this->send_custom_mail($subject, $html, $user_email);
    }

    /**
     * Send a custom email
     *
     * @param string $email - to send email to
     * @param string $subject - the subject of the email
     * @param string $html - content of the email
     * @return void
     */
    private function send_custom_mail(string $subject, string $html, string $to_email)
    {
        $content = file_get_contents(UNICAT_TEMPLATE_PATH . 'email-template.php');
        $content = str_replace(["{{title}}", "{{html}}"], [$subject, $html], $content);

        $content_type = function () {
            return 'text/html';
        };

        $headers = [];

        if ($this->settings['from_email'] != get_option('mailserver_login')) {
            $headers   = ['Reply-To: Insolvenzmonitor <'.$this->settings['from_email'].'>'];
        }

        add_filter('wp_mail_content_type', $content_type);

        wp_mail($to_email, $subject, $content, count($headers) ? $headers : null, null);

        remove_filter('wp_mail_content_type', $content_type);
    }

    private function delete_watch($id) {
        ob_clean();
        global $wpdb;

        $delete = $wpdb->delete($wpdb->prefix . 'records_watchlist', [ 'id' => $id ]);
    }
}

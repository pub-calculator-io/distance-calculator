<?php
/*
Plugin Name: Distance Calculator by Calculator.iO
Plugin URI: https://www.calculator.io/distance-calculator/
Description: Calculate the exact distance between two points in a 2D plane, 3D space, or across the Earth's surface using our fast and accurate Distance Calculator.
Version: 1.0.0
Author: www.calculator.io / Distance Calculator
Author URI: https://www.calculator.io/
License: GPLv2 or later
Text Domain: calcio_distance_calculator
*/

if (!defined('ABSPATH')) exit;

if (!function_exists('add_shortcode')) return "No direct call for Distance Calculator by www.calculator.io";

function calcio_distance_calculator_shortcode(){
    $page = 'index.html';
    return '<h2><img src="' . esc_url(plugins_url('assets/images/icon-48.png', __FILE__ )) . '" width="48" height="48">Distance Calculator</h2><div><iframe style="background:transparent; overflow: scroll" src="' . esc_url(plugins_url($page, __FILE__ )) . '" width="100%" frameBorder="0" allowtransparency="true" onload="this.style.height = this.contentWindow.document.documentElement.scrollHeight + \'px\';" id="calcio_distance_calculator_iframe"></iframe></div>';
}


add_shortcode( 'calcio_distance_calculator', 'calcio_distance_calculator_shortcode' );
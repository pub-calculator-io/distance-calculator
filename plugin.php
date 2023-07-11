<?php
/*
Plugin Name: Distance Calculator by Calculator.iO
Plugin URI: https://www.calculator.io/distance-calculator/
Description: These calculators find the distance between two points on a 2D plane, in a 3D space, as well as along the surface of the Earth with Lambert’s formulas.
Version: 1.0.0
Author: Calculator.io
Author URI: https://www.calculator.io/
License: GPLv2 or later
Text Domain: ci_distance_calculator
*/

if (!function_exists('add_shortcode')) return "No direct call for Distance Calculator by Calculator.iO";

function display_ci_distance_calculator(){
    $page = 'index.html';
    return '<h2><a href="https://www.calculator.io/distance-calculator/" target="_blank"><img src="' . esc_url(plugins_url('assets/images/icon-48.png', __FILE__ )) . '" width="48" height="48"></a> Distance Calculator</h2><div><iframe style="background:transparent; overflow: scroll" src="' . esc_url(plugins_url($page, __FILE__ )) . '" width="100%" frameBorder="0" allowtransparency="true" onload="this.style.height = this.contentWindow.document.documentElement.scrollHeight + \'px\';" id="ci_distance_calculator_iframe"></iframe></div>';
}

add_shortcode( 'ci_distance_calculator', 'display_ci_distance_calculator' );
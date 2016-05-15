<?php

return [
	// affiliation index length
	'aff_idx_len' => 3,

	// the rate for changing minutes to points
    'min_point_rate' => 10,

    // max times when generating key randomly
    'max_rand_key_gen' => 10,

    // interval (in minuts) when check the latest status
    'interval_status_student' => 5,

    // time (in minutes) between length and close
    'time_between_length_close' => 10,

    // interval (in minutes) between two reactions
    'interval_reaction' => 10,

    // default interval for chart data
    'default_interval_line_chart' => 10,

    // default interval for chart data
    'default_interval_pie_chart' => 5,

    // action
    'action' => [
        'basic'                 => 1,
        'reaction_anonymous'    => 2,
        'reaction_realname'     => 3,
        'message_anonymous'     => 4,
        'message_realname'      => 5,
    ],

	// type
    'r_type' => [
        'confused'		=> 1,
        'interesting'	=> 2,
        'boring' 		=> 3,
    ],

    // type
    'b_type' => [
        'room_in'	=> 1,
        'room_out'	=> 2,
        'fore_in'	=> 3,
        'fore_out'	=> 4,
    ],

    // type
    'm_type' => [
        'question'  => 1,
        'feeling'   => 2,
        'others'    => 3,
    ],
];
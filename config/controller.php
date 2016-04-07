<?php

return [
	// affiliation index length
	'aff_idx_len' => 3,

	// the rate for changing minutes to points
    'min_point_rate' => 10,

    // interval (in minuts) when check the latest status
    'interval_status_student' => 5,

    // interval (in minutes) between two reactions
    'interval_reaction' => 10,

    // action
    'action' => [
        'basic'                 => 1,
        'reaction_anonymous'    => 2,
        'reaction_realname'     => 3,
        'message'               => 4,
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
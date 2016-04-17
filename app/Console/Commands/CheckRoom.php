<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Foundation\Inspiring;
// Models
use App\Models\Lecture\Room;
use App\Models\Student\Affiliation;
// Carbon
use Carbon\Carbon;

/**
 * Class Inspire
 * @package App\Console\Commands
 */
class CheckRoom extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'check-room';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check room status, and close finished rooms';

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $dbs = Affiliation::select('db_name')->get();
        $now = Carbon::now();
        
        foreach ($dbs as $db)
        {
            // search each db
            $room = new Room;
            $room = $room->setConnection($db->db_name);
            $targetRooms = $room->where('closed_at',null)->select('id','created_at', 'length')->get();

            foreach ($targetRooms as $targetRoom)
            {
                $room_create_time = Carbon::createFromFormat('Y-m-d H:i:s', $targetRoom['created_at']);
                $room_lenth = $now->diffInMinutes($room_create_time);
                if($room_lenth<config('contraller.time_between_length_close')+$targetRoom->length)
                    continue;

                // close room
                $room->findOrFail($targetRoom->id)->closeRoom();
            }
        }
    }
}

<?php

namespace App\Http\Controllers\Conference;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
//Models
use App\Models\Student\Student;
use App\Models\Conference\User;
use App\Models\Conference\Conference;
use App\Models\Conference\Message;
use App\Models\Conference\Like;
//Requests
use Illuminate\Http\Request;
//Exceptions
use App\Exceptions\ApiException;

/**
 * Class AudienceController
 */
class AudienceController extends Controller
{

    protected function getConference($id)
    {
        $conference = Conference::find($id);
        if (!$conference instanceof Conference) {
            return \Response::json([
                'message' => 'Conference not found'
            ], 400);
        }

        return $conference;
    }

    protected function getAuditor($token)
    {
        $auditor = Student::where('api_token', $token)->first();
        if (!$auditor instanceof Student) {
            return \Response::json([
                'message' => 'Auditor not found'
            ], 400);
        }

        return $auditor;
    }

    protected function getMessages($conference_id, $auditor_id)
    {
        $messages = Conference::find($conference_id)
            ->messages()
            ->with('likes')
            ->get()
            ->map(function ($message, $key) use (&$auditor_id) {
                return [
                    'id' => $message['id'],
                    'text' => $message['text'],
                    'time' => $message['created_at']->timestamp,
                    'type' => $message['type'],
                    'likes' => $message['likes']->count(),
                    'liked' => $message['likes']
                        ->filter(function ($like) use (&$auditor_id) {
                            return $like['auditor_id'] == $auditor_id;
                        })
                        ->count() > 0,
                ];
            });

        return $messages;
    }

    /**
     * @return \Illuminate\View\View
     */
    public function index()
    {
        $domain = env('APP_URL');
        $env = env('APP_ENV');
        $school = 'conference';

        return view('audience.index', compact('domain', 'env', 'school'));
    }

    public function createAuditor()
    {
        $unique_token = md5(uniqid(mt_rand(), true));

        $auditor = new Student;
        $auditor->email = $unique_token . '@anonymous.auditor';
        $auditor->family_name = 'anonymous';
        $auditor->given_name = 'auditor';
        $auditor->confirmed = 1;
        $auditor->api_token = $unique_token;
        $auditor->confirmation_code = 0;
        $auditor->save();

        return \Response::json([
            'code' => $unique_token
        ], 200);
    }

    public function conference()
    {
        $conference = Conference::first();

        return \Response::json([
            'conference' => $conference
        ], 200);
    }

    public function messages(Request $request)
    {
        $conference = $this->getConference($request->conference);
        $auditor = $this->getAuditor($request->token);

        $messages = $this->getMessages($conference->id, $auditor->id);

        return \Response::json($messages, 200);
    }

    public function sendMessage(Request $request)
    {
        $now = Carbon::now();
        $conference = $this->getConference($request->conference);
        $auditor = $this->getAuditor($request->token);

        $message = new Message;
        $message->conference_id = $conference->id;
        $message->auditor_id = $auditor->id;
        $message->text = $request->text;
        $message->created_at = $now;
        $message->updated_at = $now;
        $message->save();

        $messages = $this->getMessages($conference->id, $auditor->id);

        return \Response::json($messages, 200);
    }

    public function like(Request $request)
    {
        $now = Carbon::now();
        $auditor = $this->getAuditor($request->token);

        $like = Like::where('message_id', $request->message)
            ->where('auditor_id', $auditor->id)
            ->count();

        if ($like > 0) {
            return \Response::json([
                'message' => 'Already like it'
            ], 400);
        }

        $like = new Like;
        $like->message_id = $request->message;
        $like->auditor_id = $auditor->id;
        $like->created_at = $now;
        $like->updated_at = $now;
        $like->save();

        $conference_id = Message::find($request->message)
            ->conference
            ->id;

        $messages = $this->getMessages($conference_id, $auditor->id);

        return \Response::json($messages, 200);
    }

    public function dislike(Request $request)
    {

    }    
}

exports.WelcomeParams = function (sender_id,screen_name) {
    return {
        "event": {
            "type": "message_create",
            "message_create": {
                "target": {
                    "recipient_id": sender_id
                },
                "message_data": {
                    "text": "Hi," + screen_name 

                    
                }
            }
        }
    }
}



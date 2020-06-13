import sys
import json
send_message_back = {
'arguments': sys.argv[1:], # mistype "sys" as "sy" to produce an error
'message': """Hello,
    This is my message.
    
    To the world"""
}
print(json.dumps(send_message_back))

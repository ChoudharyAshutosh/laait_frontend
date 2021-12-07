import React from 'react';
import './RequestResponseModal.css';
export default function RequestResponseModal({ requestPayload, publish, setRequestPayload, setChatViewStatus, loggedUser }){
  const acceptRequest=()=>{
    publish(requestPayload.message.sender+':response',JSON.stringify({sender:loggedUser,message:'Request accepted successfully.'}),0);
    setRequestPayload(null);
    setChatViewStatus(true);
  }
  const rejectRequest=()=>{
    publish(requestPayload.message.sender+':response',JSON.stringify({sender:loggedUser,message:'Request rejected.'}),0);
    setRequestPayload(null);
  }
  const closeResponse=()=>{
    setRequestPayload(null);
  }
  const showRequestResponse=()=>{
    console.log(requestPayload);
    return(
      <div className={'request_response_modal'}>
        <div className={'request_response_section'}>
          <div className={'request_response_message'}>
            {requestPayload.message.message}
          </div>
          <div className={'request_response_user'}>
            {requestPayload.message.sender}
          </div>
        </div>
        {
          requestPayload.topic.split(':')[1]==='request' && (
            <div className={'request_reponse_action'}>
              <button className={'request_response_accept'} onClick={acceptRequest}>Accept</button>
              <button className={'request_response_reject'} onClick={rejectRequest}>Reject</button>
            </div>
          )
        }
        {
          requestPayload.topic.split(':')[1]==='response' && (
            <div className={'request_reponse_action'}>
              <button className={'request_response_close'} onClick={closeResponse}>Close</button>
            </div>
          )
        }
      </div>
    )
  }

  return(
    <div className="request_response_modal_container">
    {
      showRequestResponse()
    }
    </div>
  )
}

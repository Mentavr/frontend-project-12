import React, { useRef, useEffect } from 'react';

const Messages = (props) => {
  const refScroll = useRef(null);
  const { isLast, messageProps } = props;
  useEffect(() => {
    isLast ? refScroll.current.scrollIntoView() : null;
  }, [refScroll]);
  const lastMessage = () => (
    <div
      className="text-break mb-2"
      ref={refScroll}
    >
      <b>{messageProps.username}</b>
      :
      {messageProps.body}
    </div>
  );

  const message = () => (
    <div className="text-break mb-2">
      <b>{messageProps.username}</b>
      :
      {messageProps.body}
    </div>
  );
  return isLast ? lastMessage() : message();
};
export default Messages;
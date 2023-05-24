import React, {useRef, useEffect} from "react"

const Messages = (props) => {
    const refScroll = useRef(null)
    useEffect(() => {
        isLast ? refScroll.current.scrollIntoView() : null;
    },[])
    const {isLast, messageProps} = props;
    const lastMessage = () => {
        return (
          <div className="text-break mb-2"
          ref={refScroll}
          >
              <b>{messageProps.username}</b>
              :
              {messageProps.body}
          </div>
          )
        }

        const message = () => {
          return (
            <div className="text-break mb-2"
            >
                <b>{messageProps.username}</b>
                :
                {messageProps.body}
            </div>
            )
        }
        return isLast ? lastMessage() : message();
}
export default Messages;

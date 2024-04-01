import { StyledChat, StyledChatList } from "@widgets/ChatList/ui/styled";

const ChatList = () => {
  return (
    <>
      <StyledChatList>
        <StyledChat>
          <p>PFP</p>
          <p>Nickname</p>
        </StyledChat>
      </StyledChatList>
    </>
  );
};

export default ChatList;

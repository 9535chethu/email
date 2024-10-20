import React from "react";
import styled from "styled-components";

const ListContainer = styled.div`
  background-color: white;
  margin: 20px;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
`;

const EmailItem = styled.div`
  display: flex;
  padding: 20px;
  border-bottom: 1px solid #f4f5f9;
  cursor: pointer;
  background-color: ${(props) => (props.read ? "white" : "#f2f5fc")};

  &:hover {
    background-color: #f4f5f9;
  }
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #e54065;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-right: 20px;
  flex-shrink: 0;
`;

const EmailContent = styled.div`
  flex: 1;
`;

const From = styled.p`
  margin: 0;
  font-weight: bold;
`;

const Subject = styled.p`
  margin: 5px 0;
  font-weight: ${(props) => (props.read ? "normal" : "bold")};
`;

const ShortDescription = styled.p`
  margin: 0;
  color: #666;
`;

const DateInfo = styled.p`
  margin: 0;
  font-size: 0.8em;
  color: #666;
`;

const FavoriteTag = styled.span`
  color: #e54065;
  font-weight: bold;
  margin-left: 10px;
`;

function EmailList({ emails, onEmailSelect }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
      .replace(",", "");
  };

  return (
    <ListContainer>
      {emails.map((email) => (
        <EmailItem
          key={email.id}
          onClick={() => onEmailSelect(email)}
          read={email.read}
        >
          <Avatar>{email.from.name[0].toUpperCase()}</Avatar>
          <EmailContent>
            <From>
              From: {email.from.name} &lt;{email.from.email}&gt;
            </From>
            <Subject read={email.read}>Subject: {email.subject}</Subject>
            <ShortDescription>{email.short_description}</ShortDescription>
            <DateInfo>
              {formatDate(email.date)}
              {email.favorite && <FavoriteTag>Favorite</FavoriteTag>}
            </DateInfo>
          </EmailContent>
        </EmailItem>
      ))}
    </ListContainer>
  );
}

export default EmailList;

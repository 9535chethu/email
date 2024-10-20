import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const BodyContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  min-height: 100%;
`;

const Subject = styled.h2`
  margin-bottom: 10px;
`;

const Content = styled.div`
  margin-bottom: 20px;
  flex-grow: 1; // Allow content to grow and push the button to the bottom
`;

const DateInfo = styled.p`
  color: #666;
`;

const FavoriteButton = styled.button`
  background-color: ${(props) => (props.isFavorite ? "#e54065" : "white")};
  color: ${(props) => (props.isFavorite ? "white" : "#e54065")};
  border: 1px solid #e54065;
  padding: 10px 20px;
  cursor: pointer;
  font-weight: bold;
  align-self: flex-start; // Align button to the left
  margin-top: 20px; // Add some space above the button

  &:hover {
    background-color: ${(props) => (props.isFavorite ? "#d63b5d" : "#fff0f3")};
  }
`;

function EmailBody({ email, onToggleFavorite }) {
  const [body, setBody] = useState("");
  const [isFavorite, setIsFavorite] = useState(email.favorite);

  useEffect(() => {
    if (email) {
      fetchEmailBody(email.id);
      setIsFavorite(email.favorite);
    }
  }, [email]);

  const fetchEmailBody = async (id) => {
    try {
      const response = await axios.get(
        `https://flipkart-email-mock.now.sh/?id=${id}`
      );
      setBody(response.data.body);
    } catch (error) {
      console.error("Error fetching email body:", error);
    }
  };

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
    onToggleFavorite();
  };

  if (!email) return <div>Select an email to view its content</div>;

  return (
    <BodyContainer>
      <Subject>{email.subject}</Subject>
      <Content dangerouslySetInnerHTML={{ __html: body }} />
      <DateInfo>{new Date(email.date).toLocaleString()}</DateInfo>
      <FavoriteButton onClick={handleFavoriteToggle} isFavorite={isFavorite}>
        {isFavorite ? "Remove from Favorites" : "Mark as Favorite"}
      </FavoriteButton>
    </BodyContainer>
  );
}

export default EmailBody;

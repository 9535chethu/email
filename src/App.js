import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import EmailList from "./EmailList";
import EmailBody from "./EmailBody";
import Footer from "./components/Footer";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; 
  background-color: #f4f5f9;
`;

const FilterContainer = styled.div`
  display: flex;
  padding: 20px;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
`;

const FilterButton = styled.button`
  margin-right: 10px;
  padding: 8px 16px;
  border: none;
  background-color: ${(props) => (props.active ? "#e1e4ea" : "transparent")};
  cursor: pointer;
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
`;

const ContentContainer = styled.div`
  display: flex;
  flex: 1;
  overflow: auto; 
`;

const LeftPanel = styled.div`
  width: 40%;
  overflow-y: auto;
`;

const RightPanel = styled.div`
  width: 60%;
  background-color: white;
  padding: 20px;
  overflow-y: auto;
`;

function App() {
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchEmails();
  }, []);

  const fetchEmails = async () => {
    try {
      const response = await axios.get("https://flipkart-email-mock.now.sh/");
      setEmails(
        response.data.list.map((email) => ({
          ...email,
          read: false,
          favorite: false,
        }))
      );
    } catch (error) {
      console.error("Error fetching emails:", error);
    }
  };

  const handleEmailSelect = (email) => {
    setSelectedEmail(email);
    markAsRead(email.id);
  };

  const markAsRead = (id) => {
    setEmails(
      emails.map((email) =>
        email.id === id ? { ...email, read: true } : email
      )
    );
  };

  const toggleFavorite = (id) => {
    setEmails(
      emails.map((email) =>
        email.id === id ? { ...email, favorite: !email.favorite } : email
      )
    );
    if (selectedEmail && selectedEmail.id === id) {
      setSelectedEmail((prevEmail) => ({
        ...prevEmail,
        favorite: !prevEmail.favorite,
      }));
    }
  };

  const filteredEmails = emails.filter((email) => {
    if (filter === "read") return email.read;
    if (filter === "unread") return !email.read;
    if (filter === "favorites") return email.favorite;
    return true;
  });

  return (
    <AppContainer>
      <FilterContainer>
        <FilterButton
          active={filter === "all"}
          onClick={() => setFilter("all")}
        >
          All
        </FilterButton>
        <FilterButton
          active={filter === "unread"}
          onClick={() => setFilter("unread")}
        >
          Unread
        </FilterButton>
        <FilterButton
          active={filter === "read"}
          onClick={() => setFilter("read")}
        >
          Read
        </FilterButton>
        <FilterButton
          active={filter === "favorites"}
          onClick={() => setFilter("favorites")}
        >
          Favorites
        </FilterButton>
      </FilterContainer>
      <ContentContainer>
        <LeftPanel>
          <EmailList
            emails={filteredEmails}
            onEmailSelect={handleEmailSelect}
          />
        </LeftPanel>
        <RightPanel>
          {selectedEmail && (
            <EmailBody
              email={selectedEmail}
              onToggleFavorite={() => toggleFavorite(selectedEmail.id)}
            />
          )}
        </RightPanel>
      </ContentContainer>
      <Footer />
    </AppContainer>
  );
}

export default App;

import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  background-color: #f8f9fa;
  position: fixed;
  bottom: 0;
  width: 100%;
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const FooterText = styled.p`
  margin: 0;
  color: #6c757d;
`;

const FooterLinks = styled.div`
  display: flex;
  align-items: center;

  p {
    color: #007bff;
    text-decoration: none;
    margin-left: 20px;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterText>
          &copy; 2024 Email Client. All rights reserved.{" "}
          <strong>developed by CHETAHN K R</strong>
        </FooterText>
        <FooterLinks>
          <p>Privacy Policy</p>
          <p>Terms of Service</p>
          <p>Contact Us</p>
        </FooterLinks>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;

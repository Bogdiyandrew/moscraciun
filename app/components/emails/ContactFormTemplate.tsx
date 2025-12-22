import * as React from 'react';
import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Preview,
    Text,
    Section,
    Hr,
} from '@react-email/components';

interface ContactFormProps {
    name: string;
    email: string;
    message: string;
}

export const ContactFormTemplate = ({
    name,
    email,
    message,
}: ContactFormProps) => (
    <Html>
        <Head />
        <Preview>Mesaj nou de la {name}</Preview>
        <Body style={main}>
            <Container style={container}>
                <Heading style={h1}>Mesaj nou de pe Site 📬</Heading>
                <Text style={text}>
                    Ai primit un mesaj nou prin formularul de contact.
                </Text>

                <Section style={box}>
                    <Text style={paragraph}><strong>Nume:</strong> {name}</Text>
                    <Text style={paragraph}><strong>Email:</strong> {email}</Text>
                    <Hr style={hr} />
                    <Text style={paragraph}><strong>Mesaj:</strong></Text>
                    <Text style={messageStyle}>{message}</Text>
                </Section>
            </Container>
        </Body>
    </Html>
);

export default ContactFormTemplate;


const main = {
    backgroundColor: '#f3f4f6',
    fontFamily: 'sans-serif',
};
const container = {
    margin: '40px auto',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    padding: '40px',
    maxWidth: '600px',
};
const h1 = {
    color: '#dc2626',
    fontSize: '24px',
    fontWeight: 'bold',
};
const text = {
    color: '#333',
    fontSize: '16px',
};
const box = {
    padding: '20px',
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
    marginTop: '20px',
    border: '1px solid #e5e7eb',
};
const paragraph = {
    fontSize: '14px',
    margin: '10px 0',
    color: '#333',
};
const messageStyle = {
    fontSize: '14px',
    color: '#333',
    fontStyle: 'italic',
    whiteSpace: 'pre-wrap' as const,
};
const hr = {
    borderColor: '#e5e7eb',
    margin: '10px 0',
};
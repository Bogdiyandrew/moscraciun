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
    Button,
    Img,
    Link,
} from '@react-email/components';

interface OrderConfirmationProps {
    childName: string;
    packageName: string;
    price: number;
}

export const OrderConfirmationTemplate = ({
    childName,
    packageName,
    price,
}: OrderConfirmationProps) => {
    return (
        <Html>
            <Head />
            <Preview>🎅 Ho Ho Ho! Comanda pentru {childName} a ajuns la Polul Nord!</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Section style={header}>
                        <Heading style={headerTitle}>Biroul Moșului 🎄</Heading>
                    </Section>

                    <Section style={content}>
                        <Heading style={h1}>Salutare, părinte a lui {childName}!</Heading>
                        <Text style={text}>
                            Spiridușii de la departamentul "Video Magic" au preluat comanda ta.
                            Moșul își curăță ochelarii și se pregătește să înregistreze mesajul.
                        </Text>

                        <Section style={orderBox}>
                            <Text style={orderHeader}>DETALII COMANDĂ</Text>
                            <Hr style={orderHr} />

                            <Section style={row}>
                                <Text style={{ ...column, fontWeight: 'bold' }}>Copil:</Text>
                                <Text style={columnRight}>{childName}</Text>
                            </Section>

                            <Section style={row}>
                                <Text style={{ ...column, fontWeight: 'bold' }}>Pachet:</Text>
                                <Text style={columnRight}>{packageName}</Text>
                            </Section>

                            <Hr style={orderHr} />

                            <Section style={row}>
                                <Text style={{ ...column, fontWeight: 'bold', fontSize: '18px' }}>TOTAL:</Text>
                                <Text style={{ ...columnRight, fontWeight: 'bold', fontSize: '18px', color: '#dc2626' }}>
                                    {price} RON
                                </Text>
                            </Section>
                        </Section>

                        <Section style={stepsBox}>
                            <Heading as="h3" style={h3}>Ce se întâmplă acum?</Heading>
                            <Text style={stepText}>1. 🎥 Echipa noastră editează videoclipul.</Text>
                            <Text style={stepText}>2. ✨ Adăugăm praful magic și efectele speciale.</Text>
                            <Text style={stepText}>3. 📧 Vei primi videoclipul chiar aici, pe email.</Text>
                        </Section>

                        <Text style={text}>
                            Dacă ai întrebări urgente, spiridușii de la suport sunt aici pentru tine.
                        </Text>

                        <Section style={btnContainer}>
                            <Button style={button} href="https://biroulmosului.ro/contact">
                                Contactează Elfii
                            </Button>
                        </Section>
                    </Section>

                    <Section style={footer}>
                        <Text style={footerText}>
                            Acest email a fost trimis automat din atelierul lui Moș Crăciun.<br />
                            © {new Date().getFullYear()} Biroul Mosului. Toate drepturile rezervate.
                        </Text>
                        <Link href="https://biroulmosului.ro" style={footerLink}>
                            www.biroulmosului.ro
                        </Link>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
};

export default OrderConfirmationTemplate;

const main = {
    backgroundColor: '#f3f4f6',
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
    margin: '40px auto',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    overflow: 'hidden',
    maxWidth: '600px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
};

const header = {
    backgroundColor: '#dc2626',
    padding: '30px 20px',
    textAlign: 'center' as const,
};

const headerTitle = {
    color: '#ffffff',
    fontSize: '28px',
    fontWeight: 'bold',
    margin: 0,
    letterSpacing: '1px',
};

const content = {
    padding: '40px',
};

const h1 = {
    color: '#1f2937',
    fontSize: '24px',
    fontWeight: '600',
    margin: '0 0 20px',
};

const h3 = {
    color: '#1f2937',
    fontSize: '18px',
    fontWeight: '600',
    margin: '0 0 15px',
};

const text = {
    color: '#4b5563',
    fontSize: '16px',
    lineHeight: '24px',
    margin: '0 0 20px',
};

const orderBox = {
    backgroundColor: '#f9fafb',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '30px',
};

const orderHeader = {
    fontSize: '12px',
    color: '#9ca3af',
    fontWeight: 'bold',
    letterSpacing: '1px',
    textTransform: 'uppercase' as const,
    margin: '0 0 10px',
};

const orderHr = {
    borderColor: '#e5e7eb',
    margin: '10px 0',
};

const row = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '5px',
};

const column = {
    fontSize: '15px',
    color: '#374151',
    margin: 0,
};

const columnRight = {
    fontSize: '15px',
    color: '#111827',
    margin: 0,
    textAlign: 'right' as const,
    float: 'right' as const,
};

const stepsBox = {
    backgroundColor: '#fffbeb',
    border: '1px solid #fcd34d',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '30px',
};

const stepText = {
    color: '#92400e',
    fontSize: '15px',
    margin: '5px 0',
};

const btnContainer = {
    textAlign: 'center' as const,
    marginTop: '30px',
};

const button = {
    backgroundColor: '#dc2626',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '16px',
    fontWeight: 'bold',
    textDecoration: 'none',
    textAlign: 'center' as const,
    display: 'inline-block',
    padding: '12px 24px',
    boxShadow: '0 4px 6px rgba(220, 38, 38, 0.3)',
};

const footer = {
    backgroundColor: '#1f2937',
    padding: '30px',
    textAlign: 'center' as const,
};

const footerText = {
    color: '#9ca3af',
    fontSize: '12px',
    lineHeight: '18px',
    margin: '0 0 10px',
};

const footerLink = {
    color: '#dc2626',
    textDecoration: 'underline',
    fontSize: '12px',
};
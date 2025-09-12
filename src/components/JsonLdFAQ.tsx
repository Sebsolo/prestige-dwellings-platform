import { Helmet } from 'react-helmet-async';

interface FAQItem {
  question: string;
  answer: string;
}

interface JsonLdFAQProps {
  faqs: FAQItem[];
}

const JsonLdFAQ = ({ faqs }: JsonLdFAQProps) => {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(faqJsonLd)}
      </script>
    </Helmet>
  );
};

export default JsonLdFAQ;
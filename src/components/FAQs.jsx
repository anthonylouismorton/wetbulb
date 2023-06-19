import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Link } from '@mui/material';

export default function FAQs({ faqs }) {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleAccordionChange = (index) => {
    if (index === expandedIndex) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };

  return (
    <>
      {faqs.map((faq, index) => (
        <Accordion
          key={index}
          expanded={index === expandedIndex}
          onChange={() => handleAccordionChange(index)}
        >
          <AccordionSummary
            sx={{
              backgroundColor: index === expandedIndex ? 'lightblue' : 'inherit',
              transition: 'background-color 0.3s ease',
            }}
          >
            <Typography>{faq.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{faq.answer}</Typography>
            {faq.source && (
              <Link href={faq.source} target="_blank" rel="noopener">
                {faq.sourceText}
              </Link>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
}

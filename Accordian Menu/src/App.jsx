import { useState } from "react";

const data = [
  {
    title: "HTML",
    content:
      "The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser."
  },
  {
    title: "CSS",
    content:
      "Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in a markup language such as HTML or XML."
  },
  {
    title: "JavaScript",
    content:
      "JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS."
  }
];

export default function Accordion() {
  return (
    <div className="accordion">
      {data.map((item, index) => (
        <AccordionItem key={index} item={item} index={index} />
      ))}
    </div>
  );
}

function AccordionItem({ item, index }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="accordion-item">
      <button
        className="accordion-header"
        aria-expanded={open}
        aria-controls={`section-${index}`}
        id={`header-${index}`}
        onClick={() => setOpen(!open)}
      >
        {item.title}
        <span className={`chevron ${open ? "rotate" : ""}`}>⌄</span>
      </button>

      <div
        className="accordion-content"
        id={`section-${index}`}
        role="region"
        aria-labelledby={`header-${index}`}
        hidden={!open}
      >
        {item.content}
      </div>
    </div>
  );
}

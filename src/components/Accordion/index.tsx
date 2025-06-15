// Build an Accordion component that displays a list of vertically stacked sections that each contain a title and content snippet.
// Some HTML is provided for you as example contents along with a chevron icon.

// Requirements
// By default, all sections are collapsed and are hidden from view.
// Clicking on a section title toggles the contents.
//  - If the section is collapsed, the section will be expanded and the contents will be displayed.
//  - If the section is expanded, the section will be collapsed and the contents will be hidden.
// The sections are independent of each other.

// Notes
// The focus of this question is on functionality, not the styling. Do not spend too much time writing custom CSS.
// You may modify the markup (e.g. adding ids, data attributes, replacing some tags, etc) and use client-side rendering instead.
// You may want to think about ways to improve the user experience of the application and implement them (you get bonus credit for doing that during interviews).

import './style.css';
import {
  useCallback,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type FC,
  type PropsWithChildren,
  type ReactNode,
} from 'react';

const Accordion = () => {
  return (
    <div role='tablist' className='accordion'>
      <Collapsible title='HTML'>
        The HyperText Markup Language or HTML is the standard markup language
        for documents designed to be displayed in a web browser.
      </Collapsible>
      <Collapsible title='CSS'>
        Cascading Style Sheets is a style sheet language used for describing the
        presentation of a document written in a markup language such as HTML or
        XML.
      </Collapsible>
      <Collapsible title='JavaScript'>
        JavaScript, often abbreviated as JS, is a programming language that is
        one of the core technologies of the World Wide Web, alongside HTML and
        CSS.
      </Collapsible>
    </div>
  );
};

const Collapsible: FC<PropsWithChildren<{ title: ReactNode }>> = (props) => {
  const contentId = useId();
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleButtonClick = useCallback(() => setIsExpanded((p) => !p), []);

  // Height calculation function
  const updateContentHeight = (element: HTMLDivElement, expanded: boolean) => {
    if (expanded) {
      try {
        const height = element.scrollHeight || 0;
        element.style.maxHeight = `${height}px`;
      } catch (e) {
        console.error('Fallback to CSS', e);
      }
    } else {
      element.style.maxHeight = '0';
    }
  };

  useLayoutEffect(() => {
    const contentElement = contentRef.current;

    if (!contentElement) {
      return;
    }

    updateContentHeight(contentElement, isExpanded);
  }, [isExpanded]);

  return (
    <div className='accordion-item'>
      <button
        type='button'
        role='tab'
        aria-expanded={isExpanded}
        aria-controls={contentId}
        onClick={handleButtonClick}
        className='accordion-header'
      >
        <span className='accordion-title'>{props.title}</span>
        <span
          aria-hidden='true'
          className={`ml-2 accordion-icon ${
            isExpanded ? 'accordion-icon--rotated' : ''
          }`}
        />
      </button>
      <div
        id={contentId}
        role='tabpanel'
        className={`accordion-content ${isExpanded ? 'accordion-content--expanded' : 'accordion-content--collapsed'}`}
        aria-expanded={isExpanded}
        ref={contentRef}
      >
        <div className='accordion-content-inner'>{props.children}</div>
      </div>
    </div>
  );
};

export default Accordion;

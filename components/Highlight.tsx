import 'highlight.js/styles/monokai-sublime.css';
import { PropsWithChildren, useEffect, useRef } from 'react';

const CodeHighlight = ({ children }: PropsWithChildren) => {
    const highlightElement = useRef<any>(null);

    useEffect(() => {
        if (highlightElement?.current) {
           // hightlight.highlightElement(highlightElement.current.querySelector('pre'));
        }
    }, []);

    return (
        <div ref={highlightElement} className="highlight-el">
            {children}
        </div>
    );
};

export default CodeHighlight;

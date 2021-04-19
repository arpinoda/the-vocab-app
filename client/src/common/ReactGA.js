import GA4React from 'ga-4-react';

export default (async function() {
    if (process.env.NODE_ENV === 'development') return;
    
    const measurementId = process.env.REACT_APP_GA_MEASUREMENT_ID;
    
    if (!measurementId) return;
    const gaReact = new GA4React(measurementId);
    
    try {
        const ga = await gaReact.initialize()
        ga.pageview('/');
    } catch(error) {
        
    }
})();



export default function parseGptResponse(gptResponse: string){
    // Split the input string into individual days
    const daySections = gptResponse.split('### Day ');

    // Initialize the result object
    const resultObject: any = {};

    // Loop through each day section starting from index 1 (index 0 is an empty string)
    for (let i = 1; i < daySections.length; i++) {
        const daySection = daySections[i];
        
        // Extract day number and date
        const dayInfo = daySection.match(/(\d+): (\d{4}-\d{2}-\d{2})/);
        if (!dayInfo) continue; // Skip if day info is not found
        
        const dayNumber = `Day ${dayInfo[1]}`;
        const date = dayInfo[2];
        
        // Initialize the nested object for this day
        resultObject[dayNumber] = { Date: date };
        
        // Extract morning, afternoon, and evening activities
        const timeSections = daySection.split('#### ');
        for (const timeSection of timeSections) {
            if (timeSection.startsWith('Morning:')) {
            resultObject[dayNumber]['Morning'] = timeSection
                .replace('Morning:', '')
                .trim()
                .split('\n \n')
                .map(activity => activity.trim());
            } else if (timeSection.startsWith('Afternoon:')) {
            resultObject[dayNumber]['Afternoon'] = timeSection
                .replace('Afternoon:', '')
                .trim()
                .split('\n \n')
                .map(activity => activity.trim());
            } else if (timeSection.startsWith('Evening:')) {
            resultObject[dayNumber]['Evening'] = timeSection
                .replace('Evening:', '')
                .trim()
                .split('\n \n')
                .map(activity => activity.trim());
            }
        }
    }
    return resultObject;
}

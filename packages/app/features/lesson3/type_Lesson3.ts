export type ContentLesson3 = {
    description: string;
    poster: string;
    video: string;
    image: string;
    header1: string;
    squaretext1: string;
    table1: { [key: string]: Tables };
    header2: string;
    description2: string;
    description3: string;
    description4: string;
    description5: string;
    description6: string;
    squaretext2: string;
    blockText1: { [key: string]: Exercise };
    squaretext3: string;
    blockText2: { [key: string]: Exercise };
    header3: string;
    squaretext4: string;
    test1: { example: { question: string, unswer: string[]};
             testContent: {[key: string]: Tests}};
}

export type Tables = {
    name: string;
    row1: string;
    row2: string;
    row3: string;
    row4: string;
    row5: string;
};

export type Exercise = {
    text: string;
    example1: string;
    example2: string;
    example3: string;
    example4: string;
    example5: string;
    example6: string;
    example7: string;
    example8: string;
    example9: string;
    example10: string;
}

export type Tests = {
    question: string;
    unswer: string[];
}
export type ContentLesson3_2 = {
    description: string;
    poster: string;
    video: string;
    image: string;
    headerBlock1: string;
    squareText1: string;
    tableBlock1: { [key: string]: Tables };
    headerBlock2: string;
    descriptionBlock1: string;
    langTest2_1: { example: { question1: string, question2: string, unswer: string[]};
         testContent: {[key: string]: Tests2 }};
    squeareText2: string;
    descriptionBlock2: string;
    descriptionBlock3: string;
    descriptionBlock4: string;
    exercisesBlockText2: { [key: string]: Exercise };
    lifeHackerBlock1: {
        image: string;
        title: string;
        description1: string;
        content1: { [key: string]: Texts };
        description2: string;
        content2: { [key: string]: Texts };
        description3: string;
        content3: { [key: string]: Texts };
        description4: string;
        content4: { [key: string]: Texts };
    };
    squaeText3: string;
    langTest1_2: { example: { question: string, unswer: string[]};
        testContent: {[key: string]: Tests1 }};
    squareText4: string;
    langTest1_3: { example: { question: string, unswer: string[]};
        testContent: {[key: string]: Tests1 }};
    headerBlock3: string;
    squareText5: string;
    exercisesBlockText3: { [key: string]: Exercise };
    descriptionBlock5: string;
    exercisesBlockText4: { [key: string]: Exercise };
    squareText8: string;
    descriptionBlock6: string;
    wordToTranslateBlock1: { [key: string]: Words };
    headerBlock4: string;
    descriptionBlock7: string;
    langTest1_4: { example: { question: string, unswer: string[]};
        testContent: {[key: string]: Tests1 }};
    descriptionBlock8: string;
    langTest1_5: { example: { question: string, unswer: string[]};
        testContent: {[key: string]: Tests1 }};
}

export type Tables = {
    name: string;
    row1: string;
    row2: string;
    row3: string;
    row4: string;
    row5: string;
    row6: string;
    row7: string;
    row8: string;
    row9: string;
    row10: string;
    row11: string;
    row12: string;
    row13: string;
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

export type Tests1 = {
    question: string;
    unswer: string[];
    help: string;
}

export type Tests2 = {
    question1: string;
    question2: string;
    unswer: string[];
    help: string;
}

export type Texts = {
    text: string;
}

export type Words = {
    text1: string;
    text2: string;
    description: string;
}
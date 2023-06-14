export type ContentLesson4 = {
    description: string;
    poster: string;
    video: string;
    image: string;
    headerBlock1: string;
    descriptionBlock1: string;
    tableBlock1: { [key: string]: Tables };
    squareText1: string;
    textExampleBlock1: { [key: string]: ExampleAndAnswer };
    descriptionBlock2: string;
    squareText2: string;
    textExampleBlock2: { [key: string]: ExampleAndAnswer };
    headerBlock3: string;
    squareText3: string;
    langTest1_1: { example: { question: string, unswer: string[]};
        testContent: {[key: string]: Tests1 }};
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
    headerBlock2: string;
    squareText4: string;
    descriptionBlock3: string;
    exercisesBlockText3: { [key: string]: Exercise };
    textExampleBlock3: { [key: string]: ExampleAndAnswer };
    descriptionBlock4: string;
    textExampleBlock4: { [key: string]: ExampleAndAnswer };
    descriptionBlock5: string;
    textExampleBlock5: { [key: string]: ExampleAndAnswer };
    descriptionBlock6: string;
    squareText5: string;
    langTest1_2: { example: { question: string, unswer: string[]};
        testContent: {[key: string]: Tests1 }};
    headerBlock4: string;
    descriptionBlock7: string;
    squareText8: string;
    textExampleBlock8: { [key: string]: ExampleAndAnswer };
    squareText9: string;
    textExampleBlock9: { [key: string]: ExampleAndAnswer };
    squareText10: string;
    langTest1_3: { example: { question: string, unswer: string[]};
        testContent: {[key: string]: Tests1 }};
    headerBlock5: string;
    descriptionBlock8: string;
    descriptionBlock9: string;
    textExampleBlock10: { [key: string]: ExampleAndAnswer };
    descriptionBlock10: string;
    textExampleBlock11: { [key: string]: ExampleAndAnswer };
    descriptionBlock11: string;
    squareText11: string;
    langTest1_4: { example: { question: string, unswer: string[]};
        testContent: {[key: string]: Tests1 }};
    headerBlock12: string;
    textExampleBlock12: { [key: string]: ExampleAndAnswer };
    lifeHackerBlock2: {
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
    lifeHackerBlock3: {
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
    textExampleBlock13: { [key: string]: ExampleAndAnswer };
    squareText12: string;
    squareText13: string;
    squareText14: string;
    wordToTranslateBlock1: { [key: string]: Words };
    wordToTranslateBlock2: { [key: string]: Words };
    wordToTranslateBlock3: { [key: string]: Words };
    wordToTranslateBlock4: { [key: string]: Words };
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

export type ExampleAndAnswer = {
    description: string;
    example1: string;
    prononce1: string;
    help1: string;
    example2: string;
    prononce2: string;
    help2: string;
    example3: string;
    prononce3: string;
    help3: string;
    example4: string;
    prononce4: string;
    help4: string;
    example5: string;
    prononce5: string;
    help5: string;
    example6: string;
    prononce6: string;
    help6: string;
    example7: string;
    prononce7: string;
    help7: string;
    example8: string;
    prononce8: string;
    help8: string;
    example9: string;
    prononce9: string;
    help9: string;
    example10: string;
    prononce10: string;
    help10: string;
    example11: string;
    prononce11: string;
    help11: string;
    example12: string;
    prononce12: string;
    help12: string;
    example13: string;
    prononce13: string;
    help13: string;
    example14: string;
    prononce14: string;
    help14: string;
    example15: string;
    prononce15: string;
    help15: string;
    example16: string;
    prononce16: string;
    help16: string;
    example17: string;
    prononce17: string;
    help17: string;
    example18: string;
    prononce18: string;
    help18: string;
    example19: string;
    prononce19: string;
    help19: string;
    example20: string;
    prononce20: string;
    help20: string;
    example21: string;
    prononce21: string;
    help21: string;
    example22: string;
    prononce22: string;
    help22: string;
    example23: string;
    prononce23: string;
    help23: string;
    example24: string;
    prononce24: string;
    help24: string;
    example25: string;
    prononce25: string;
    help25: string;
    example26: string;
    prononce26: string;
    help26: string;
    example27: string;
    prononce27: string;
    help27: string;
    example28: string;
    prononce28: string;
    help28: string;
    example29: string;
    prononce29: string;
    help29: string;
    example30: string;
    prononce30: string;
    help30: string;
}
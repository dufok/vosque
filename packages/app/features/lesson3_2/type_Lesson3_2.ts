export type ContentLesson3_2 = {
    name: string;
    description: string;
    poster: string;
    video: string;
    image: string;
    headerBlock1: string;
    squareText1: string;
    tableBlock1: Table;
    headerBlock2: string;
    squareText2: string;
    langTest2_1: { example: { question1: string, question2: string, unswer: string[], help: string};
         testContent: {[key: string]: Tests2 }};
    headerBlock5: string;
    descriptionBlock2: string;
    descriptionBlock3: string;
    descriptionBlock4: string;
    exercisesBlockText2: { [key: string]: Exercise };
    lifeHackerBlock1: {
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
    squareText3: string;
    langTest1_2: { example: { question: string, unswer: string[]};
        testContent: {[key: string]: Tests1 }};
    squareText4: string;
    langTest1_3: { example: { question: string, unswer: string[]};
        testContent: {[key: string]: Tests1 }};
    headerBlock3: string;
    squareText5: string;
    wordToTranslateBlock1: { [key: string]: Words };
    descriptionBlock5: string;
    wordToTranslateBlock2: { [key: string]: Words };
    squareText8: string;
    descriptionBlock6: string;
    wordToTranslateBlock3: { [key: string]: Words };
    headerBlock6: string;
    descriptionBlock10: string;
    exercisesBlockAudio1: { [key: string]: Line };
    headerBlock4: string;
    squareText6: string;
    langTest1_4: { example: { question: string, unswer: string[]};
        testContent: {[key: string]: Tests1 }};
    squareText7: string;
    langTest1_5: { example: { question: string, unswer: string[]};
        testContent: {[key: string]: Tests1 }};
  }

export type Table = {
    header: string;
    rows: Row[];
  };

export type Row = {
    name?: string;
    data: string[];
    spanAllColumns?: boolean;
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

export type Line = {
    text: string;
    audio: string;
  };
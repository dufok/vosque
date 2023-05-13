export type ContentLesson2 = {
    description: string;
    poster: string;
    video: string;
    image: string;
    header1: string;
    table1: { [key: string]: Tables };
    squeretext1: string;
    blockText1: { [key: string]: Exercise };
    squeretext2: string;
    blockText2: { [key: string]: Exercise };
    squeretext3: string;
    header2: string;
    table2: { [key: string]: Tables };
    lifehack1: {
        image: string;
        title: string;
        description1: string;
        content1: {
          1: { text: string };
          2: { text: string };
          3: { text: string }
        },
        description2: string;
        content2: {
          1: { text: string };
          2: { text: string };
          3: { text: string }
        }
    },
    header3: string;
    table3: { [key: string]: Tables };
    lifehack2: {
        image: string;
        title: string;
        description1: string;
        content1: {
          1: { text: string };
          2: { text: string };
          3: { text: string }
        },
        description2: string;
        content2: {
          1: { text: string };
          2: { text: string };
          3: { text: string }
        }
    },
    lifehack3: {
        image: string;
        title: string;
        description1: string;
        content1: {
          1: { text: string };
          2: { text: string };
          3: { text: string }
        },
        description2: string;
        content2: {
          1: { text: string };
          2: { text: string };
          3: { text: string }
        }
    },
    header4: string;
    description4: string;
    test1: { example: { question: string, unswer: string[]};
             testContent: {[key: string]: Tests}};
    description5: string;
    test2: { example: { question: string, unswer: string[]};
             testContent: {[key: string]: Tests}};
    description6: string;
    test3: { example: { question: string, unswer: string[]};
             testContent: {[key: string]: Tests}};
    header5: string;
    blockText3: { [key: string]: Exercise };
    wordToTranlateBlock1: { [key: string]: Words };
    squeretext5: string;
    description7: string;
    blockText4: { [key: string]: Exercise };
    description8: string;
    table4: { [key: string]: Tables };
    lifehack4: {
        image: string;
        title: string;
        description1: string;
        content1: {
          1: { text: string };
          2: { text: string };
          3: { text: string }
        },
        description2: string;
        content2: {
          1: { text: string };
          2: { text: string };
          3: { text: string }
        }
    },
    squeretext8: string;
    blockText8: { [key: string]: Exercise };
}

export type Tables = {
    name: string;
    row1: string;
    row2: string;
    row3: string;
    row4: string;
};

export type Exercise = {
    text: string;
    example: string;
}

export type Tests = {
    question: string;
    unswer: string[];
}

export type Words = {
    text1: string;
    text2: string;
}
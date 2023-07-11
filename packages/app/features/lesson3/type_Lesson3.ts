export type ContentLesson3 = {
    description: string;
    poster: string;
    video: string;
    image: string;
    header1: string;
    exercisesBlockText1: { [key: string]: Exercise };
    squareText1: string;
    tableBlock1: Table;
    header2: string;
    description2: string;
    description3: string;
    description4: string;
    description5: string;
    description6: string;
    headerBlock3: string;
    blockText1: { [key: string]: Exercise };
    headerBlock4: string;
    blockText2: { [key: string]: Exercise };
    header3: string;
    squareText4: string;
    langTest4_1: { example: { header: string, question: string, unswer: string};
        testContent: {[key: string]: Tests4 }};
    part2: ContentLesson3_2;
}

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
  langTest2_1: { example: { question1: string, question2: string, unswer: string, help: string};
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
  langTest1_2: { example: { header: string, question: string, unswer: string};
      testContent: {[key: string]: Tests1 }};
  squareText4: string;
  langTest1_3: { example: { header: string, question: string, unswer: string};
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
  dopDialog1: { [key: string]: Content };

  headerBlock4: string;
  squareText6: string;
  langTest4_1: { example: { header: string, question: string, unswer: string};
      testContent: {[key: string]: Tests4 }};
  squareText7: string;
  langTest1_5: { example: { header: string, question: string, unswer: string};
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
    help1: string;
    example2: string;
    help2: string;
    example3: string;
    help3: string;
    example4: string;
    help4: string;
    example5: string;
    help5: string;
    example6: string;
    help6: string;
    example7: string;
    help7: string;
    example8: string;
    help8: string;
    example9: string;
    help9: string;
    example10: string;
    help10: string;
  };

export type Tests = {
    description: string;
    question: string;
    unswer: string[];
}

export type Tests4 = {
  description: string;
  question: string;
  unswer: string[];
  help: string;
}

export type Tests1 = {
  question: string;
  unswer: string[];
  help: string;
}

export type Words = {
  text1: string;
  text2: string;
  description: string;
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

export type Content = {
  text: string;
  src: string;
};
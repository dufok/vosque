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
    squareText2: string;
    blockText1: { [key: string]: Exercise };
    squareText3: string;
    blockText2: { [key: string]: Exercise };
    header3: string;
    squareText4: string;
    test1: { example: { question: string, unswer: string[]};
             testContent: {[key: string]: Tests}};
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

export type Tests = {
    question: string;
    unswer: string[];
}
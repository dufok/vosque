
export type ContentLesson1 = {
    description: string;
    poster: string;
    video: string;
    image: string;
    headerBlock1: string;
    squareText1: string;
    descriptionBlock1: string;
    buttonWithSheetBlock1: { [key: string]: Letter };
    squareText2: string;
    textExampleBlock1: { [key: string]: ExampleAndAnswer };
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
    textExampleBlock2: { [key: string]: ExampleAndAnswer };
    headerBlock2: string;
    squareText3: string;
    exercisesBlockAudioWithDisc1: { [key: string]: Exercise };
    headerBlock3: string;
    descriptionBlock2: string;
    squareText4: string;
    exercisesBlockAudio1: { [key: string]: Line };
    lifeHackerBlock2: {
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
    headerBlock4: string;
    exercisesBlockText1: { [key: string]: ExerciseWTF };
    squareText5: string;
    exercisesBlockAudio2: { [key: string]: Line };
    headerBlock5: string;
    descriptionBlock3: string;
    wordToTranslateBlock1: { [key: string]: Words };
  };

  export type Example = {
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
  };

  export type TeoryBlockProps = {
    img: string;
    header: string;
    name1: string;
    text1: string;
    name2: string;
    description2: string;
    name3: string;
    letters: Record<string, Letter>;
  };

  export type Exercise = {
    description: string;
    text: string;
    audio: string
  };

  export type ExerciseWTF = {
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

  export type Exercise2 = {
    text: string;
    audio: string
  };
  
  export type Line = {
    text: string;
    audio: string;
  };

  export type ContentVocabulary = {
    text1: string;
    text2: string;
    description: string
  }

  export type Letter = {
    name: string;
    description: string;
    Colum1_1: string;
    Colum2_1: string;
    Colum3_1: string;
    Colum4_1: string;
    Colum1_2: string;
    Colum2_2: string;
    Colum3_2: string;
    Colum4_2: string;
  };

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

  

  export type Texts = {
    text: string;
}

export type Words = {
  text1: string;
  text2: string;
  description: string;
}
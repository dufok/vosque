
export type ContentLesson1 = {
    description: string;
    poster: string;
    video: string;
    theoreticalBlock: { 
      header: string;
      image: string;
      alfabet: { header: string; text: string; };
      complex: { header: string; description: string; letters: {  [key: string]: Letter }};
      attention: { title: string; atentionBlocks: { [key: string]: atentionBlock }};
    },
    exercisesBlock: {
      header: string;
      training1: {
        header: string;
        description: string;
        exercises: { [key: string]: exercise };
      },
      additional: {
        header: string;
        materials: {
          readingPhrase: {
            description: string;
            text: string;
            linesAdditional: { [key: string]: Line };
          }
        }
      },
      accent: {
        header: string;
        contentAccents: { [key: string]: ContentAccent };
      },
      training2: {
        header: string;
        description: string;
        exercises2: { [key: string]: exercise2 };
      },
    },
    vocabulary: {
      header: string;
      description: string;
      contentVocabularys: { [key: string]: ContentVocabulary };
    },
    lifehacks: {
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
      lifehack2: {
        image: string;
        title: string;
        description1: string;
      },
      lifehack3: {
        image: string;
        title: string;
        description1: string;
      }
    }
  };

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

  export type atentionBlock = {
    description: string;
    example1: string;
    example2: string;
    example3: string;
    example4: string;
    prononce1: string;
    prononce2: string;
    prononce3: string;
    prononce4: string;
  };

  export type exercise = {
    description: string;
    text: string;
    audio: string
  };

  export type exercise2 = {
    text: string;
    audio: string
  };
  
  export type Line = {
    text: string;
    audio: string;
  };

  export type ContentAccent = {
    text: string;
    example: string
  }

  export type ContentVocabulary = {
    text1: string;
    text2: string;
    description: string
  }
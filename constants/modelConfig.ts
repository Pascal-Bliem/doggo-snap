const modelConfig = {
  imageSize: 224,
  numChannels: 3,
  channelNormalization: {
    R: { mean: 0.512, std: 0.267 },
    G: { mean: 0.489, std: 0.263 },
    B: { mean: 0.422, std: 0.271 },
  },
};

export default modelConfig;

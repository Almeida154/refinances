const ShadowBox = (elevation: number = 20, opacity: number = 0.4) => {
  return {
    shadowColor: `rgba(0, 0, 0, ${opacity})`,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: elevation,
  };
};

export default ShadowBox;

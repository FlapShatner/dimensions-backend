export const getMakes = async () => {
    try {
        const makes = await prisma.make.findMany();
        return makes;
    } catch (error) {
        console.log(error);
    }
    }; 

export const getModels = async (make) => {
    const makeWithModels = await prisma.make.findUnique({
        where: {
          name: makeName,
        },
        include: {
          models: true, // Include all models associated with this make
        },
      });
    
      if (makeWithModels) {
        console.log(`Models for ${makeName}:`, makeWithModels.models);
        return makeWithModels.models;
      } else {
        console.log(`No make found with the name ${makeName}`);
        return [];
      }
    };


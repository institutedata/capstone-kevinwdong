

//@desc     sorting out query selection and return a query for serch function to use
const getEventQuery = async (req, res) => {
  try {
    let query = {};

    if (req.query.event_id) query = { _id: req.query.event_id };
    else if (!req.query.cityName) {
      if (req.query.dt_txt) query = { dt_txt: req.query.dt_txt };

      if (req.query.typeOfSport) query = { typeOfSport: req.query.typeOfSport };

      if (req.query.user_id) query = { user_id: req.query.user_id };

      if (req.query.dt_txt && req.query.user_id)
        query = {
          dt_txt: req.query.dt_txt,
          user_id: req.query.user_id,
        };

      if (req.query.dt_txt && req.query.typeOfSport)
        query = {
          dt_txt: req.query.dt_txt,
          typeOfSport: req.query.typeOfSport,
        };

      if (req.query.typeOfSport && req.query.user_id)
        query = {
          typeOfSport: req.query.typeOfSport,
          user_id: req.query.user_id,
        };

      if (Object.keys(req.query).length === 3 && !req.query.cityName)
        query = {
          typeOfSport: typeOfSport,
          dt_txt: req.query.dt_txt,
          user_id: req.query.user_id,
        };
    } else {
      const searchLocation = await locationController.getLocation(req, res);
      const latitude = searchLocation.lat;
      const longitude = searchLocation.lon;

      if (req.query.cityName)
        query = { "lat": latitude, "lon": longitude };

      if (req.query.cityName && req.query.dt_txt)
        query = {
          "lat": latitude,
          "lon": longitude,
          dt_txt: req.query.dt_txt,
        };

      if (req.query.cityName && req.query.user_id)
        query = {
          "lat": latitude,
          "lon": longitude,
          user_id: req.query.user_id,
        };

      if (req.query.cityName && req.query.typeOfSport)
        query = {
          "lat": latitude,
          "lon": longitude,
          typeOfSport: req.query.typeOfSport,
        };

      if (Object.keys(req.query).length === 3 && !req.query.typeOfSport)
        query = {
          "lat": latitude,
          "lon": longitude,
          dt_txt: req.query.dt_txt,
          user_id: req.query.user_id,
        };

      if (Object.keys(req.query).length === 3 && !req.query.dt_txt)
        query = {
          "lat": latitude,
          "lon": longitude,
          typeOfSport: req.query.typeOfSport,
          user_id: req.query.user_id,
        };

      if (Object.keys(req.query).length === 3 && !req.query.user_id)
        query = {
          "lat": latitude,
          "lon": longitude,
          typeOfSport: req.query.typeOfSport,
          dt_txt: req.query.dt_txt,
        };

      if (Object.keys(req.query).length === 4)
        query = {
          typeOfSport: req.query.typeOfSport,
          dt_txt: req.query.dt_txt,
          user_id: req.query.user_id,
          "lat": latitude,
          "lon": longitude,
        };
    }

    return query;
  } catch (error) {
    console.error("Event query selected unsuccessfully:".bgRed, error.message);
  }
};

//@desc     sorting out query selection and return a query for serch function to use
const deleteEventQuery = async (req, res) => {
  try {
    let query = {};

    if (req.query.event_id)
      query = { _id: req.query.event_id, user_id: req.query.user_id };
    else if (!req.query.cityName) {
      if (req.query.dt_txt)
        query = { dt_txt: req.query.dt_txt, user_id: req.query.user_id };

      if (req.query.typeOfSport)
        query = {
          typeOfSport: req.query.typeOfSport,
          user_id: req.query.user_id,
        };

      if (req.query.dt_txt && req.query.typeOfSport)
        query = {
          dt_txt: req.query.dt_txt,
          user_id: req.query.user_id,
          typeOfSport: req.query.typeOfSport,
        };
    } else {
      const searchLocation = await locationController.getLocation(req, res);
      const latitude = searchLocation.lat;
      const longitude = searchLocation.lon;

      if (req.query.cityName)
        query = {
          "lat": latitude,
          "lon": longitude,
          user_id: req.query.user_id,
        };

      if (req.query.cityName && req.query.dt_txt)
        query = {
          "lat": latitude,
          "lon": longitude,
          dt_txt: req.query.dt_txt,
          user_id: req.query.user_id,
        };

      if (req.query.cityName && req.query.typeOfSport)
        query = {
          "lat": latitude,
          "lon": longitude,
          user_id: req.query.user_id,
          typeOfSport: req.query.typeOfSport,
        };

      if (req.query.dt_txt && req.query.typeOfSport && req.query.cityName)
        query = {
          "lat": latitude,
          "lon": longitude,
          typeOfSport: req.query.typeOfSport,
          user_id: req.query.user_id,
          dt_txt: req.query.dt_txt,
        };
    }
    return query;
  } catch (error) {
    console.error(
      "Event deleting query seleted unsuccessfully:".bgRed,
      error.message
    );
  }
};

export default {
  getEventQuery,
  deleteEventQuery,
};

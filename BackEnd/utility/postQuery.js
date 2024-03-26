

const getPostQuery = async (req, res) => {
    try {
        let query = {};

            if (req.query.post_id) query = { _id: req.query.post_id };
            else {
            if (req.query.typeOfSport) query = { typeOfSport: req.query.typeOfSport };

            if (req.query.user_id) query = { user_id: req.query.user_id };

            if (req.query.event_id) query = { event_id: req.query.event_id };

            if (req.query.typeOfSport && req.query.user_id)
                query = {
                typeOfSport: req.query.typeOfSport,
                user_id: req.query.user_id,
                };

            if (req.query.typeOfSport && req.query.event_id)
                query = {
                typeOfSport: req.query.typeOfSport,
                event_id: req.query.event_id,
                };

            if (req.query.user_id && req.query.event_id)
                query = {
                user_id: req.query.user_id,
                event_id: req.query.event_id,
                };

            if (req.query.user_id && req.query.event_id && req.query.typeOfSport)
                query = {
                typeOfSport: req.query.typeOfSport,
                event_id: req.query.event_id,
                user_id: req.query.user_id,
                };
            }

            return query

    }   catch (error) {
        console.error("Post query seleted unsuccessfully:".bgRed, error.message)
    }

}



const deletePostQuery = async (req, res) => {
    try {
        let query = {};
      if (req.query.user_id)
        query = {user_id: req.query.user_id}

      if (req.query.typeOfSport)
        query = {
          typeOfSport: req.query.typeOfSport,
          user_id: req.query.user_id,
        };

      if (req.query.event_id)
        query = { event_id: req.query.event_id, user_id: req.query.user_id };

      if (req.query.typeOfSport && req.query.event_id)
        query = {
          typeOfSport: req.query.typeOfSport,
          event_id: req.query.event_id,
          user_id: req.query.user_id,
        };

      if (req.query.post_id )
        query = {
          _id: req.query.post_id,
        };

        return query
    } catch (error) {
        console.error("Post deleting query selected unsuccessfully:".bgRed, error.message)
    }

}

export default {
    getPostQuery,
    deletePostQuery
}    

import { gql } from "@apollo/client";

// Query for testing if connected to api
export const GET_TEST_INFO = gql`
  query info {
    info
  }
`;

// Query for getting medication list
export const GET_MEDICATIONS = gql`
  query medications {
    medications {
      responseCheck {
        success
        message
      }
      medications {
        id
        medication_name
        medicine_type
        supplied_by
        quantity
        quantity_type
        withdrawal_days_meat
        withdrawal_days_dairy
        remaining_quantity
        batch_number
        expiry_date
        purchase_date
        comments
      }
    }
  }
`;

/**
 * @description: Query for getting medication detail
 * @param id: medication id generated automatically by database
 * */

export const GET_MEDICATION_DETAILS = gql`
  query medication($id: ID!) {
    medication(id: $id) {
      responseCheck {
        success
        message
      }
      medication {
        id
        medication_name
        supplied_by
        quantity
        quantity_type
        withdrawal_days_meat
        withdrawal_days_dairy
        remaining_quantity
        batch_number
        expiry_date
        purchase_date
        comments
      }
    }
  }
`;

/**
 * @description: Query for getting herd list
 */
export const GET_HERD = gql`
  query herd {
    herd {
      responseCheck {
        success
        message
      }
      animals {
        id
        tag_number
        herd_number
        sire_number
        mother_number
        male_female
        breed_type
        pure_breed
        animal_name
        description
        date_of_birth
      }
    }
  }
`;

/**
 * @description: Get Animal details by id
 * @param: id: ID was generated automatically
 */
export const GET_ANIMAL_DITAILS = gql`
  query animal($id: ID!) {
    animal(id: $id) {
      responseCheck {
        success
        message
      }
      animal {
        id
        tag_number
        herd_number
        sire_number
        mother_number
        male_female
        breed_type
        pure_breed
        animal_name
        description
        date_of_birth
      }
    }
  }
`;

// Query for getting breed info
export const GET_BREED_INFO = gql`
  query breed($id: ID!) {
    breed(id: $id) {
      responseCheck {
        success
        message
      }
      breed {
        id
        breed_name
        breed_code
      }
    }
  }
`;

// Query for getting Group list
export const GET_GROUP = gql`
  query groups {
    groups {
      responseCheck {
        success
        message
      }
      groups {
        id
        group_name
        group_description
      }
    }
  }
`;

//Query for getting user infomation
export const GET_USER_INFO = gql`
  query farmer {
    farmer {
      responseCheck {
        success
        message
      }
      farmer {
        id
        first_name
        second_name
        farm_type
        farm_address
        email
        herd_number
      }
    }
  }
`;

// Query for getting medication usage infomation list
export const GET_MEDICATION_USAGE_LIST = gql`
  query administeredMedications {
    administeredMedications {
      responseCheck {
        success
        message
      }
      administeredMedications {
        id
        date_of_administration
        quantity_administered
        quantity_type
        administered_by
        reason_for_administration
        animal_id
        medication_id
      }
    }
  }
`;

/**
 * @description: query for getting medication usage details
 * @param: id: administeredMedications id was generated automatically
 * @requires: name of the id must be 'id'
 */
export const GET_MEDICATION_USAGE_DETAIL = gql`
  query administeredMedication($id: ID) {
    administeredMedication(id: $id) {
      responseCheck {
        success
        message
      }
      administeredMedication {
        id
        date_of_administration
        quantity_administered
        quantity_type
        administered_by
        reason_for_administration
        animal_id
        medication_id
      }
    }
  }
`;
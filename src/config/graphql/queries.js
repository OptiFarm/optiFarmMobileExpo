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
        _id
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
    medication(_id: $id) {
      responseCheck {
        success
        message
      }
      medication {
        _id
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
        _id
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
        last_calved
      }
    }
  }
`;

/**
 * @description: Get Animal details by id
 * @param: id: ID was generated automatically
 */
export const GET_ANIMAL_DETAILS = gql`
  query animal($id: ID!) {
    animal(_id: $id) {
      responseCheck {
        success
        message
      }
      animal {
        _id
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
        last_calved
      }
    }
  }
`;

// Query for getting breed info
export const GET_BREED_INFO = gql`
  query breed($id: ID!) {
    breed(_id: $id) {
      responseCheck {
        success
        message
      }
      breed {
        _id
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
        _id
        group_name
        group_description
        group_size
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
        _id
        date_of_administration
        quantity_administered
        quantity_type
        administered_by
        reason_for_administration
        animal_id
        medication_id
        medication {
          medication_name
        }
        animal {
          tag_number
        }
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
    administeredMedication(_id: $id) {
      responseCheck {
        success
        message
      }
      administeredMedication {
        _id
        date_of_administration
        quantity_administered
        withdrawal_end_meat
        withdrawal_end_dairy
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
 * @description: query for getting animal count
 * @param:
 * @requires:
 */
export const GET_ANIMAL_COUNT = gql`
  query herdCount {
    herdCount {
      responseCheck {
        success
        message
      }
      count
    }
  }
`;

/**
 * @description: query for homepage medicine list
 * @param:
 * @requires:
 */
export const GET_HOMEPAGE_MEDICNE = gql`
  query medicationsLastThreeUsed {
    medicationsLastThreeUsed {
      responseCheck {
        success
        message
      }
      medications {
        _id
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
 * @description: query for last medicated inside animal details
 * @param:
 * @requires:
 */
export const GET_LAST_MEDICATION_ANIMAL = gql`
  query animalWithLastMedication($id: ID!) {
    animalWithLastMedication(_id: $id) {
      responseCheck {
        success
        message
      }
      administeredMedications {
        _id
        date_of_administration
        administered_by
        quantity_administered
        quantity_type
        reason_for_administration
        withdrawal_end_meat
        withdrawal_end_dairy
        medication {
          _id
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
        animal {
          _id
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
  }
`;

/**
 * @description: query for getting progeny list
 * @param:
 * @requires:
 */
export const GET_ANIMAL_BY_PROGENY = gql`
  query animalByProgeny($tag_number: Int!) {
    animalByProgeny(tag_number: $tag_number) {
      responseCheck {
        success
        message
      }
      animals {
        _id
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
 * @description: query for getting animal count within a group
 * @param:
 * @requires:
 */
export const GET_ANIMAL_IN_GROUP_COUNT = gql`
  query animalsInGroupCount($groups_id: ID!) {
    animalsInGroupCount(groups_id: $groups_id) {
      responseCheck {
        success
        message
      }
      count
    }
  }
`;

export const GET_ANIMAL_IN_GROUP = gql`
  query animalsInGroup($groups_id: ID!) {
    animalsInGroup(groups_id: $groups_id) {
      responseCheck {
        success
        message
      }
      animals {
        _id
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

import { gql } from "@apollo/client";

/**
 * @description: Login function
 * @param: email:String! password:String!
 */

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      responseCheck {
        success
        message
      }
      token
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

/**
 * @description: SignUp function
 * @param: email: Stirng!
 *         password: String!
 *         first_name: String!
 *         second_name: String!
 *         farm_type: FarmType!
 *         farm_address: String,
 *         herd_number: String!
 */
export const SIGN_UP = gql`
  mutation signUp(
    $email: String!
    $password: String!
    $first_name: String!
    $second_name: String!
    $farm_type: FarmType!
    $farm_address: String
    $herd_number: String!
  ) {
    signUp(
      email: $email
      password: $password
      first_name: $first_name
      second_name: $second_name
      farm_type: $farm_type
      farm_address: $farm_address
      herd_number: $herd_number
    ) {
      responseCheck {
        success
        message
      }
      token
      farmer {
        _id
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

/**
 * @description: add animal or update animal
 * @param: tag_number: Int!
 *         sire_number: Int!
 *         mother_number: Int!
 *         male_femail: Sex!
 *         breed_type: String!
 *         pure_breed: Boolean!
 *         animal_name: String!
 *         discription: String!
 *         date_of_birth: Date!
 * !warning: id is required when update animal
 */
export const ADD_OR_UPDATE_ANIMAL = gql`
  mutation saveAnimal(
    $_id: ID
    $tag_number: Int!
    $sire_number: Int!
    $mother_number: Int!
    $male_female: Sex!
    $breed_type: String!
    $pure_breed: Boolean!
    $animal_name: String!
    $description: String!
    $date_of_birth: Date!
  ) {
    saveAnimal(
      _id: $_id
      tag_number: $tag_number
      sire_number: $sire_number
      mother_number: $mother_number
      male_female: $male_female
      breed_type: $breed_type
      pure_breed: $pure_breed
      animal_name: $animal_name
      description: $description
      date_of_birth: $date_of_birth
    ) {
      responseCheck {
        success
        message
      }
      animal {
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
 * @description: delete animal by id
 * @param: id:ID! the animal id generated automatically
 */
export const DELETE_ANIMAL = gql`
  mutation deleteAnimal($_id: ID!) {
    deleteAnimal(_id: $_id) {
      responseCheck {
        success
        message
      }
      animal {
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
 * @description: create a new group or update a group
 * @param: group_name: String!
 *         group_description: String!
 * !warning: id is required when need to update a group(name or info)
 */
export const CREATE_OR_UPDATE_GROUP = gql`
  mutation saveGroup(
    $id: ID
    $group_name: String!
    $group_description: String!
  ) {
    saveGroup(
      _id: $id
      group_name: $group_name
      group_description: $group_description
    ) {
      responseCheck {
        success
        message
      }
      group {
        group_name
        group_description
      }
    }
  }
`;

/**
 * @description: save or update medication information
 * @param: medication_name: String!
 *         supplied_by: String!
 *         quantity: Int!
 *         quantity_type: QuantityType!
 *         withdrawal_days_meat: Int
 *         withdrawal_days_dairy: Int
 *         batch_number: String!
 *         expiry_date: Date!
 *         purchase_data: Date!
 *         comments: String
 * !warning: id is required when need to update the medication information
 */
export const SAVE_OR_UPDATE_MEDICATION = gql`
  mutation saveMedication(
    $id: ID
    $medication_name: String!
    $medicine_type: MedicineType!
    $supplied_by: String!
    $quantity: Int!
    $quantity_type: QuantityType!
    $withdrawal_days_meat: Int
    $withdrawal_days_dairy: Int
    $batch_number: String!
    $expiry_date: Date!
    $purchase_date: Date!
    $comments: String
  ) {
    saveMedication(
      _id: $id
      medication_name: $medication_name
      medicine_type: $medicine_type
      supplied_by: $supplied_by
      quantity: $quantity
      quantity_type: $quantity_type
      withdrawal_days_meat: $withdrawal_days_meat
      withdrawal_days_dairy: $withdrawal_days_dairy
      batch_number: $batch_number
      expiry_date: $expiry_date
      purchase_date: $purchase_date
      comments: $comments
    ) {
      responseCheck {
        success
        message
      }
      medication {
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
 * @description: create a new medication usage record or update the medication usage details
 * @param: date_of_administration: Date!
 *         quantity_administration: Date!
 *         administered_by: String!
 *         reason_for_administration: String!
 *         animal_id: ID
 *         medication_id: ID
 * !warning: id is required when the need to update the medication usage
 * !warning: animal_id & medication_id may require to change the name when using
 */
export const SAVE_OR_UPDATE_MEDICATION_USAGE = gql`
  mutation saveAdminMed(
    $id: ID
    $date_of_administration: Date!
    $quantity_administered: Int!
    $administered_by: String!
    $reason_for_administration: String!
    $animal_id: ID
    $medication_id: ID
  ) {
    saveAdminMed(
      _id: $id
      date_of_administration: $date_of_administration
      quantity_administered: $quantity_administered
      administered_by: $administered_by
      reason_for_administration: $reason_for_administration
      animal_id: $animal_id
      medication_id: $medication_id
    ) {
      responseCheck {
        success
        message
      }
      administeredMedication {
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
 * @description: adding new group
 * @param: group_name: String!
 *         group_description: String!
 */
export const SAVE_GROUP = gql`
  mutation saveGroup ( $group_name: String!, $group_description: String!) {
    saveGroup (group_name: $group_name, group_description: $group_description) {
        responseCheck {
            success
            message
        }
        group {
            _id
            group_name
            group_description
        }
    }
  }
`;

/**
 * @description: adding animal to a group
 * @param: _id: ID!
 *         groups_id: ID!
 * !warning: id is required to adding animal from group
 */
export const ADD_ANIMAL_TO_GROUP = gql`
  mutation addAnimalToGroup ($_id: ID!, $groups_id: ID!) {
    addAnimalToGroup (_id: $_id, groups_id: $groups_id) {
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
        last_calved
        male_female
        breed_type
        groups_id
        pure_breed
        animal_name
        description
        date_of_birth
      }
    }
  }
`;

/**
 * @description: deleting group
 * @param: _id: ID!
 * !warning: id is required to delete group
 */
export const DELETE_GROUP = gql`
  mutation deleteGroup ($_id: ID!) {
    deleteGroup (_id: $_id) {
        responseCheck {
            success
            message
        }
        group {
            _id
            group_name
            group_description
        }
    }
  }
`; 

/**
 * @description: remove animal from group
 * @param: _id: ID!
 *         groups_id: ID!
 * !warning: id is required to remove animal from group
 */
export const REMOVE_ANIMAL_FROM_GROUP = gql`
  mutation removeAnimalFromGroup ($_id: ID!, $groups_id: ID!) {
    removeAnimalFromGroup (_id: $_id, groups_id: $groups_id) {
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
        last_calved
        male_female
        breed_type
        groups_id
        pure_breed
        animal_name
        description
        date_of_birth
      }
    }
  }
`;
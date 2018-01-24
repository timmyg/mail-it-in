import SimpleSchema from "simpl-schema";

AddressesSchema = new SimpleSchema({
  address: {
    type: String,
    max: 100,
    trim: false // messes with live input if true
  },
  city: {
    type: String,
    max: 50,
    trim: false // messes with live input if true
  },
  state: {
    type: String,
    autoValue: function() {
      if (this.isSet && typeof this.value === "string") {
        return this.value.toUpperCase();
      }
    },
    regEx: /^A[LKSZRAEP]|C[AOT]|D[EC]|F[LM]|G[AU]|HI|I[ADLN]|K[SY]|LA|M[ADEHINOPST]|N[CDEHJMVY]|O[HKR]|P[ARW]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]$/
  },
  zip: {
    type: String,
    regEx: /^[0-9]{5}$/
  }
});

using System;
using System.ComponentModel.DataAnnotations;

namespace AuctionWebAPI.Validations
{
    public class PriceValidationAttribute : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if (value == null)
            {
                return ValidationResult.Success; // Allow null values
            }

            if (value is decimal decimalValue)
            {
                if (decimalValue >= 0)
                {
                    return ValidationResult.Success;
                }
                else
                {
                    return new ValidationResult("The value must be greater than 0.");
                }
            }

            return new ValidationResult("Invalid data type.");
        }
    }
}


import React from "react";
import { useForm } from 'react-hook-form';

import "./style.css";

const Profile = () => {
    // TODO: Get the profile of user from backend and autofill the profile.
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm();

    const onSubmit = (data) => {
        // Handle form submission, data contains the form values
        console.log('Form data:', data);
        // You can send this data to your backend for storage or further processing
    };
      
    return (
        <section id="profile">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1>Company's details</h1>
                <div id="company-details" className="form-boundry">
                    <div className="input-row">
                        <label>Company's name</label>
                        <div className="input-div">
                            <input
                                {...register("companyName", {
                                    required: "Company's name is required",
                                    maxLength:10,
                                })}
                            />
                            {errors.companyName?.type === "required" && (
                                <p role="alert">Company's name is required</p>
                            )}
                        </div>
                    </div>

                    <div className="input-row">
                        <label>Company's details:</label>
                        <div className="input-div">
                            <textarea
                                {...register("aboutCompany", {
                                    required: "Company's details are required"
                                })}
                            />
                            {errors.aboutCompany && <p role="alert">{errors.aboutCompany.message}</p>}    
                        </div>
                    </div>

                    <div className="input-row">
                        <label>Company's culture:</label>
                        <div className="input-div">
                            <textarea
                                {...register("companyCulture", {
                                    required: "Please define your company's culture"
                                })}
                            />
                            {errors.companyCulture && <p role="alert">{errors.companyCulture.message}</p>}
                        </div>
                    </div>
                </div>
                <input type="submit" />
            </form>
        </section>
    );
};
 
export default Profile;
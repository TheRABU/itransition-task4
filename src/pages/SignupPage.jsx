import { Link, useNavigate, useLocation } from "react-router-dom";

import Swal from "sweetalert2";
const SignupPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // signupHandler
  const handleSignUp = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    const signupCredentials = {
      name,
      email,
      password,
    };

    try {
      if (password.length > 0) {
        fetch(
          `https://itransition-task4-backend.onrender.com/api/users/register`,
          {
            method: "POST",
            headers: {
              "Content-Type": "Application/json",
            },
            body: JSON.stringify(signupCredentials),
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.error) {
              alert(data.error);
            } else {
              console.log("User Registered:", data.user);
              alert(
                `Registration successful! Registered at: ${data.user.registrationTime}`
              );
            }
          })
          .then(() => {
            Swal.fire({
              position: "top-center",
              icon: "success",
              title: "Registration Successful",
              showConfirmButton: false,
              timer: 1500,
            });
            const redirect = location?.state?.from?.pathname || "/";
            navigate(redirect);
          });
      }
    } catch (error) {
      console.log("Error found at Trycatch", error.message);
    }
  };
  return (
    <>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Sign Up now!</h1>
            <p className="py-6">
              Sign Up using your email and Password. <br />
              You can see some of the contents only if you Login. So login right
              now !!
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleSignUp} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="input input-bordered"
                  required
                />
                {/* <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label> */}
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  SIGN UP
                </button>
              </div>
              <div>
                <Link className="text-black" to="/login">
                  Already have an account?{" "}
                  <span className="text-blue-500 underline">Signup Now</span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;

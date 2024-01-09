import { Disclosure, Menu, Transition } from "@headlessui/react"
import { ShoppingCartIcon ,BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline"
import React, { Fragment, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, matchPath, useLocation, useNavigate } from "react-router-dom"
import { logOut } from "../store/auth/actions"
import { getAllProductsCart } from "../store/products/actions"
import { RootState } from "../store/reducers"

const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ")
}

const Navbar: React.FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state?.auth.isLoggedIn)
  const productsCart  = useSelector((state: RootState) => state.products.productsCart);
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const isActive = (path: string) => {
    return !!matchPath(location.pathname, path)
  }
  useEffect(() => {
    dispatch(getAllProductsCart())
  }, [dispatch])
  useEffect(() => {
  if(productsCart.length > 0){
    console.log("🚀 ~ useEffect ~ productsCart:", productsCart)
  }
  }, [productsCart])

  const handleLogOut = async (e) => {
    e.preventDefault()

    dispatch(
      logOut(() => {
        navigate("/")
      })
    )
  }
  return (
    <Disclosure as="nav" className="bg-teal-500">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative z-40 flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-none flex  px-9 sm:px-0 lg:px-0  items-center justify-center ">
                <div className="  flex items-baseline justify-between ">
                  <img
                    className="block lg:hidden h-12 w-auto"
                    src="/shopping.png"
                    alt="Workflow"
                  />
                  <img
                    className="hidden lg:block h-12 w-auto"
                    src="/shopping.png"
                    alt="Workflow"
                  />
                </div>
                <h1 className=" font-extrabold tracking-tight text-3xl text-white hidden lg:block sm:block md:block">Haura Shop</h1>
              </div>
              {isLoggedIn ? (
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <button
                    type="button"
                    className="p-1 mr-3 rounded-full focus:text-white text-gray-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                    <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full top-3 -end-0 right-18 dark:border-gray-900">20</div>
                  </button>
                  <button
                    type="button"
                    className="p-1 rounded-full focus:text-white text-gray-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
                    <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full top-3 -end-0 right-12 lg:right-10  dark:border-gray-900">20</div>
                  </button>
                  
                  {/* Profile dropdown */}
                  <Menu as="div" className="ml-3 relative">
                    <div>
                      <Menu.Button className=" flex focus:text-white text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-white">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to={`/home`}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Your Profile
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to={`/`}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Settings
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              onClick={handleLogOut}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Sign out
                            </a>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              ) : null}
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {isLoggedIn ? (
                <Link
                  to="/products"
                  className={classNames(
                    isActive("/products")
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={isActive("/products") ? "page" : undefined}
                >
                  Products
                </Link>
              ) : (
                <Link
                  to="/auth/login"
                  className={classNames(
                    isActive("/auth/login")
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={isActive("/auth/login") ? "page" : undefined}
                >
                  Login
                </Link>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default Navbar

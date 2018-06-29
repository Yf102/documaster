<?php
/**
 * Created by PhpStorm.
 * User: filiphristov
 * Date: 28/06/2018
 * Time: 16:27
 */

namespace App\Controller;

use Documaster\UsersQuery;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;


class SecurityController extends Controller
{

	/**
	 * @Route("/login", name="login")
	 * @param Request $request
	 * @return \Symfony\Component\HttpFoundation\Response
	 */
	public function login(Request $request)
	{
		$username = $request->get("_username");
		$password = $request->get("_password");

		$error = null;
		$lastUsername = $username;

		if($request->isMethod("POST")) {
			$user = UsersQuery::create()->findOneByUserEmail($username);
			if(empty($user)) {
				// TODO: Server Log
				$error = "No such user";
			} else if($password !== $user->getUserPass()) {
				// TODO: Server Log
				$error = "Email or password is wrong";
			} else {
				// start session for user
				$_SESSION['user_mail'] = $username;
				$_SESSION['user_id'] = $user->getId();

				return $this->redirectToRoute('app_main');
			}
		}

		return $this->render('security/login.html.twig', array(
			"props" => array(
				'last_username' => $lastUsername,
				'error' => $error
			),
		));
	}


	/**
	 * @Route("/logout", name="logout")
	 * @return \Symfony\Component\HttpFoundation\RedirectResponse
	 */
	public function logout() {
		session_unset();
		return $this->redirectToRoute('login');
	}
}

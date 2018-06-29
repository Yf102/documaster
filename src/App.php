<?php
/**
 * Created by PhpStorm.
 * User: filiphristov
 * Date: 29/06/2018
 * Time: 12:03
 */

class DocumasterApp
{
	private $_curUser = null;

	/**
	 * @return \Documaster\Users|null
	 */
	public function curUser()
	{
		// have loaded the user already?
		if (!empty($this->_curUser)) {
			return $this->_curUser;
		}
		// load user info based on session or API auth
		$email = isset($_SESSION['user_mail']) ? $_SESSION['user_mail'] : null;
		if (empty($email)) {
			return null;
		}

		$this->_curUser =	\Documaster\UsersQuery::create()->findOneByUserEmail($email);
		return $this->_curUser;
	}

	/**
	 * @return string|null
	 */
	public function userToken() {
		return isset($_SESSION['user_token']) ? $_SESSION['user_token'] : null;
	}
}

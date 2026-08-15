<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

// Allow requests from GitHub Pages
header('Access-Control-Allow-Origin: https://engrbilawalkhanbilal.github.io');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true) ?? $_POST;

    $name    = isset($data['name']) ? trim($data['name']) : '';
    $email   = isset($data['email']) ? trim($data['email']) : '';
    $subject = isset($data['subject']) ? trim($data['subject']) : 'New Contact Form Submission';
    $message = isset($data['message']) ? trim($data['message']) : '';

    if (empty($name) || empty($email) || empty($message)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Please fill in all required fields.']);
        exit;
    }

    $to   = 'bilawalkhanjandan@gmail.com';
    $body = "You received a new message from your website contact form:\n\n";
    $body .= "Name: $name\n";
    $body .= "Email: $email\n";
    $body .= "Subject: $subject\n\n";
    $body .= "Message:\n$message\n";

    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'bilawalkhanjandan@gmail.com';
        $mail->Password   = 'YOUR_16_DIGIT_APP_PASSWORD'; // Insert Gmail App Password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        $mail->setFrom('bilawalkhanjandan@gmail.com', 'Portfolio Contact Form');
        $mail->addAddress($to);
        $mail->addReplyTo($email, $name);

        $mail->isHTML(false);
        $mail->Subject = "Portfolio Contact: $subject";
        $mail->Body    = $body;

        $mail->send();
        echo json_encode(['success' => true, 'message' => 'Message sent successfully!']);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => "Mailer Error: {$mail->ErrorInfo}"]);
    }
} else {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method Not Allowed']);
}
?>

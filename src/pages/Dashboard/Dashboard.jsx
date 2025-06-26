import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [followers, setFollowers] = useState(0);
  const [lastPost, setLastPost] = useState(null);

  const visitorData = {
    labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
    datasets: [
      {
        label: "Visitantes",
        data: [120, 190, 150, 220, 300, 250, 400],
        backgroundColor: "rgba(54, 162, 235, 0.7)"
      }
    ]
  };

  const visitorOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Visitantes do site nos últimos 7 dias" }
    }
  };

  useEffect(() => {
    async function fetchInstagramData() {
      const token = import.meta.env.VITE_FACEBOOK_ACCESS_TOKEN;
      const userId = import.meta.env.VITE_INSTAGRAM_USER_ID;

      if (!token || !userId) {
        setError("Token ou User ID do Instagram não configurados.");
        setLoading(false);
        return;
      }

      try {

        const profileRes = await fetch(

          `https://graph.facebook.com/${userId}?fields=username,followers_count&access_token=${token}`

        );
        const profileData = await profileRes.json();

        if (profileData.error) throw new Error(profileData.error.message);

        setFollowers(profileData.followers_count);

        const mediaRes = await fetch(

          `https://graph.facebook.com/${userId}/media?fields=id,caption,media_url,like_count,timestamp&access_token=${token}&limit=1`

        );
        
        const mediaData = await mediaRes.json();

        if (mediaData.error) throw new Error(mediaData.error.message);

        if (mediaData.data && mediaData.data.length > 0) {
          setLastPost(mediaData.data[0]);
        } else {
          setLastPost(null);
        }

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }

    fetchInstagramData();
  }, []);

  if (loading) return <div className="text-center mt-5"><Spinner animation="border" /></div>;
  if (error) return <Alert variant="danger" className="mt-5 text-center">{error}</Alert>;

  return (
    <Container className="py-5">
      <h1 className="mb-4 text-center">Dashboard</h1>

      <Row className="mb-4">
        {/* Total seguidores */}
        <Col md={4}>
          <Card className="text-center p-3">
            <Card.Body>
              <Card.Title>Total de Seguidores</Card.Title>
              <h2>{followers.toLocaleString()}</h2>
              <p>Instagram</p>
            </Card.Body>
          </Card>
        </Col>

        {/* Último post */}
        <Col md={4}>
          <Card>
            {lastPost ? (
              <>
                <Card.Img variant="top" src={lastPost.media_url} alt="Último post" />
                <Card.Body>
                  <Card.Title>Último Post</Card.Title>
                  <Card.Text>{lastPost.caption || "Sem legenda"}</Card.Text>
                  <Card.Text><strong>{lastPost.like_count || 0}</strong> curtidas</Card.Text>
                </Card.Body>
              </>
            ) : (
              <Card.Body>
                <Card.Text>Nenhum post encontrado.</Card.Text>
              </Card.Body>
            )}
          </Card>
        </Col>

        {/* Visitantes */}
        <Col md={4}>
          <Card className="p-3">
            <Bar data={visitorData} options={visitorOptions} />
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
